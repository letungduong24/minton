# Minton - Modular Monolith Architecture

## Cấu trúc dự án

Dự án được thiết kế theo kiến trúc **Modular Monolith** với **Domain-Driven Design (DDD)** và **Clean Architecture**.

### 📁 Cấu trúc thư mục

```
Minton/
├── Minton/                    # API Layer (Presentation)
│   ├── Controllers/          # API Controllers
│   ├── Program.cs           # Application startup
│   └── appsettings.json     # Configuration
│
├── Minton.Application/       # Application Layer
│   ├── Account/             # Account Module
│   │   ├── Commands/        # CQRS Commands
│   │   ├── Queries/         # CQRS Queries
│   │   ├── Handlers/        # Command/Query Handlers
│   │   ├── Responses/       # DTOs
│   │   └── Mappers/         # Object Mappers
│   └── Helpers/             # Shared utilities
│
├── Minton.Core/             # Domain Layer
│   ├── Domain/              # Domain Layer
│   │   ├── Account/         # Account Domain
│   │   │   ├── Entities/    # Domain Entities
│   │   │   ├── ValueObjects/# Value Objects
│   │   │   ├── Repositories/# Repository Interfaces
│   │   │   └── Services/    # Domain Services
│   │   └── Shared/          # Shared Domain
│   │       ├── BaseEntity.cs
│   │       ├── ValueObject.cs
│   │       ├── IRepository.cs
│   │       └── DomainException.cs
│
├── Minton.Infrastructure/   # Infrastructure Layer
│   ├── Account/             # Account Infrastructure
│   │   ├── Repositories/    # Repository Implementations
│   │   └── Services/        # Domain Service Implementations
│   └── Context/             # Database Context
│
└── Minton.Migrations/       # Database Migrations
```

## 🏗️ Kiến trúc

### 1. **Domain Layer** (Minton.Core)
- **Entities**: Business objects với identity và lifecycle
- **Value Objects**: Immutable objects không có identity
- **Domain Services**: Business logic phức tạp
- **Repository Interfaces**: Contracts cho data access

### 2. **Application Layer** (Minton.Application)
- **Commands/Queries**: CQRS pattern
- **Handlers**: Business logic orchestration
- **Responses**: DTOs cho API responses
- **Mappers**: Object mapping

### 3. **Infrastructure Layer** (Minton.Infrastructure)
- **Repository Implementations**: Data access logic
- **Domain Service Implementations**: External service integrations
- **Database Context**: Entity Framework configuration

### 4. **API Layer** (Minton)
- **Controllers**: HTTP endpoints
- **Dependency Injection**: Service registration
- **Configuration**: App settings

## 🔧 Tính năng chính

### ✅ **Modular Design**
- Mỗi domain (Account, Rating, etc.) có module riêng
- Clear boundaries giữa các modules
- Dễ dàng mở rộng và maintain

### ✅ **Domain-Driven Design**
- Rich domain models với business logic
- Value objects cho validation
- Domain services cho complex operations

### ✅ **Clean Architecture**
- Dependency Inversion Principle
- Separation of concerns
- Testable architecture

### ✅ **CQRS Pattern**
- Commands cho write operations
- Queries cho read operations
- MediatR implementation

### ✅ **Validation & Error Handling**
- Domain-level validation
- Proper error responses
- Business rule enforcement

## 🚀 Cách chạy

1. **Restore packages**:
   ```bash
   dotnet restore
   ```

2. **Update database**:
   ```bash
   dotnet ef database update --project Minton.Migrations --startup-project Minton
   ```

3. **Run application**:
   ```bash
   cd Minton
   dotnet run
   ```

4. **Access Swagger UI**:
   ```
   http://localhost:5000/swagger
   ```

## 📋 API Endpoints

### Account Module
- `POST /api/Account/create-user` - Tạo user mới
- `GET /api/Account/user/{id}` - Lấy thông tin user

## 🔄 Migration từ cấu trúc cũ

### Những thay đổi chính:
1. **Domain Entities**: User entity với business logic
2. **Value Objects**: Email validation
3. **Domain Services**: UserDomainService cho business operations
4. **Modular Structure**: Account module riêng biệt
5. **Proper Error Handling**: Domain exceptions và validation
6. **Clean Dependencies**: Dependency injection đúng cách

### Lợi ích:
- ✅ **Maintainability**: Code dễ maintain và mở rộng
- ✅ **Testability**: Dễ dàng unit test
- ✅ **Scalability**: Có thể tách thành microservices sau này
- ✅ **Business Logic**: Business rules được enforce ở domain level
- ✅ **Type Safety**: Strong typing và validation
