import Cookies from "js-cookie"

export class AuthTokenService {
  private static readonly ACCESS_TOKEN_KEY = "accessToken"
  private static readonly REFRESH_TOKEN_KEY = "refreshToken"
  private static readonly USER_KEY = "user"

  static saveTokens(accessToken: string, refreshToken: string): void {
    Cookies.set(this.ACCESS_TOKEN_KEY, accessToken, { expires: 1 }) // 1 day
    Cookies.set(this.REFRESH_TOKEN_KEY, refreshToken, { expires: 30 }) // 30 days
  }

  static getAccessToken(): string | undefined {
    return Cookies.get(this.ACCESS_TOKEN_KEY)
  }

  static getRefreshToken(): string | undefined {
    return Cookies.get(this.REFRESH_TOKEN_KEY)
  }

  static removeTokens(): void {
    Cookies.remove(this.ACCESS_TOKEN_KEY)
    Cookies.remove(this.REFRESH_TOKEN_KEY)
    Cookies.remove(this.USER_KEY)
  }

  static saveUser(user: any): void {
    try {
      const userString = JSON.stringify(user)
      Cookies.set(this.USER_KEY, userString, { expires: 30 })
    } catch (error) {
      console.error("Error saving user to cookies:", error)
    }
  }

  static getUser(): any {
    try {
      const userJson = Cookies.get(this.USER_KEY)
      if (!userJson) return null
      return JSON.parse(userJson)
    } catch (error) {
      console.error("Error parsing user from cookies:", error)
      return null
    }
  }

  static getUserRole(): "admin" | "teacher" | null {
    const user = this.getUser()
    return user?.role || null
  }

  static isAuthenticated(): boolean {
    return !!this.getAccessToken() && !!this.getUser()
  }
}
