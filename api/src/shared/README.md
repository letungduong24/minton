# Shared Services & Interceptors

## Cookie Management

### CookieService
Quản lý các operations liên quan đến cookie:
- `setAccessToken(response, token)`: Set HTTP-only cookie với JWT token
- `clearAccessToken(response)`: Clear cookie khi logout

### CookieInterceptor
Interceptor tự động xử lý việc set cookie:
- Tự động detect `accessToken` trong response
- Set HTTP-only cookie và loại bỏ token khỏi response body
- Đảm bảo security và clean response

### Cách sử dụng

1. **Trong Controller**: Chỉ cần thêm `@UseInterceptors(CookieInterceptor)` vào các endpoint cần set cookie
2. **Response format**: Trả về object có `accessToken` property, interceptor sẽ tự động xử lý
3. **Logout**: Sử dụng `CookieService.clearAccessToken()` để clear cookie

### Ví dụ

```typescript
@Post('login')
@UseInterceptors(CookieInterceptor)
async login(@Request() request) {
    return this.authService.signIn(request.user); // Trả về { accessToken, user }
}
```

Interceptor sẽ:
1. Nhận response `{ accessToken: "jwt_token", user: {...} }`
2. Set cookie `access_token` với JWT token
3. Trả về `{ user: {...} }` (loại bỏ accessToken)
