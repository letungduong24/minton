export enum PrismaError {
  // Lỗi khi record không tồn tại (thường cho update/delete)
  NOT_FOUND = 'P2025',

  // Lỗi khi trùng unique field (email, uid, v.v.)
  DUPLICATE = 'P2002',

  // Lỗi khi quan hệ foreign key vi phạm
  FOREIGN_KEY_VIOLATION = 'P2003',

  // Lỗi khi constraint khác
  CONSTRAINT_FAILED = 'P2004',

  // Lỗi validation dữ liệu
  VALIDATION_FAILED = 'P2000',

  // Các lỗi khác mà Prisma ném
  OTHER = 'OTHER',
}
