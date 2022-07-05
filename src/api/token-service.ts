class TokenService {
  getLocalRefreshToken() {
    return localStorage.getItem("refreshToken");
  }
  getLocalAccessToken() {
    console.log("🚀 ~ file: token-service.ts ~ line 7 ~ TokenService ~ getLocalAccessToken ~ localStorage.getItem(z)", localStorage.getItem("token"))
   return localStorage.getItem("token");
  }
  updateLocalAccessToken(token:string) {
    console.log('update token',token);
    
    localStorage.setItem("token", token);
  }
  removeAccessToken() {
    console.log('remove access token');
    
    localStorage.removeItem("token");
  }
}
export default new TokenService();

export function getLocalAccessToken() {
  console.log("🚀 ~ file: token-service.ts ~ line 7 ~ TokenService ~ getLocalAccessToken ~ localStorage.getItem(z)", localStorage.getItem("token"))
 return localStorage.getItem("token");
}