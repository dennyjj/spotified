package main

import (
	"encoding/base64"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
	spotifyauth "github.com/zmb3/spotify/v2/auth"
)

var (
	state = "gdfg"
	auth  *spotifyauth.Authenticator
	port  = "8080"
)

func main() {
	err2 := godotenv.Load()
	if err2 != nil {
		log.Fatal("Error loading .env file")
	}

	http.Handle("/auth", corsMiddleware(http.HandlerFunc(authHandler)))
	http.Handle("/callback", corsMiddleware(http.HandlerFunc(redirectHandler)))
	// http.Handle("/token", corsMiddleware(http.HandlerFunc(tokenHandler)))

	err := http.ListenAndServe(":"+port, nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}

func authHandler(w http.ResponseWriter, r *http.Request) {
	auth = spotifyauth.New(
		spotifyauth.WithRedirectURL(os.Getenv("SPOTIFY_OAUTH_REDIRECT_URL")),
		spotifyauth.WithScopes(
			spotifyauth.ScopeUserReadPrivate,
			spotifyauth.ScopeUserModifyPlaybackState,
			spotifyauth.ScopeUserTopRead,
		),
	)

	url := auth.AuthURL(state)
	fmt.Fprint(w, url)
}

type Token struct {
	AccessToken  string `json:"accessToken"`
	RefreshToken string `json:"refreshToken"`
	TokenType    string `json:"tokenType"`
	Expiry       int64  `json:"expiry"`
}

func redirectHandler(w http.ResponseWriter, r *http.Request) {
	token, err := auth.Token(r.Context(), state, r)
	if err != nil {
		log.Printf("Error getting token: %v", err)
		http.Error(w, "Couldn't get token", http.StatusNotFound)
		return
	}

	tokenJson, err := json.Marshal(Token{
		AccessToken:  token.AccessToken,
		RefreshToken: token.RefreshToken,
		TokenType:    token.TokenType,
		Expiry:       token.Expiry.Unix(),
	})
	if err != nil {
		http.Error(w, "Failed to encode token", http.StatusInternalServerError)
		return
	}

	tokenBase64 := base64.StdEncoding.EncodeToString(tokenJson)

	http.SetCookie(w, &http.Cookie{
		Name:  "token",
		Value: tokenBase64,
		Path:  "/",
	})

	http.Redirect(w, r, os.Getenv("FRONTEND_ROOT_URL"), http.StatusFound)
}

// func tokenHandler(w http.ResponseWriter, r *http.Request) {
// 	cookie, err := r.Cookie("token")
// 	if err != nil {
// 		return
// 	}

// 	tokenStr := cookie.Value

// 	tokenBytes, err := base64.StdEncoding.DecodeString(tokenStr)
// 	if err != nil {
// 		http.Error(w, "Couldn't decode token", http.StatusInternalServerError)
// 		return
// 	}

// 	token := &oauth2.Token{}
// 	err = json.Unmarshal(tokenBytes, token)
// 	if err != nil {
// 		http.Error(w, "Couldn't unmarshal token", http.StatusInternalServerError)
// 		return
// 	}

// 	newToken, err := auth.RefreshToken(r.Context(), token)
// 	if err != nil {
// 		http.Error(w, "Couldn't refresh token", http.StatusInternalServerError)
// 		return
// 	}

// 	jsonData, err := json.Marshal(newToken)
// 	if err != nil {
// 		http.Error(w, "Couldn't marshal token", http.StatusInternalServerError)
// 		return
// 	}

// 	w.Header().Set("Content-Type", "application/json")
// 	w.Write(jsonData)
// }

func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
		if r.Method == "OPTIONS" {
			return
		}
		next.ServeHTTP(w, r)
	})
}
