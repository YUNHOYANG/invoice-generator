# Claude.md

## 📌 프로젝트 개요
본 프로젝트는 **Railway.app**에 호스팅되는 **Next.js 기반 인보이스 작성 사이트**입니다.  
주요 기능:  
- 구글 로그인(OAuth2) → 사용자 별 데이터 저장  
- 인보이스 작성 및 저장 (PostgreSQL 연동)  
- 로고 이미지 업로드  
- PDF 다운로드  
- 구글 애드센스 연동  

---


- **프론트/백 통합**: Next.js 단일 프로젝트에서 로그인 API 및 DB API 운영 (NextAuth.js 활용)  
- **데이터베이스**: Railway Postgres  
- **로그인**: Google OAuth → NextAuth.js → JWT/Session 관리  
- **광고**: 구글 애드센스 스크립트 삽입  

---

## 🔐 인증 방식 (Google OAuth via NextAuth.js)
- 로그인 버튼 클릭 → Google OAuth 화면 → 동의 → callback  
- NextAuth가 사용자 정보(email, name, profile image) PostgreSQL(User 테이블)에 저장  
- 이후 세션으로 사용자 인증, 인보이스는 각 사용자별 데이터만 접근 가능  

---

## 🗄️ 데이터베이스 구조 (Prisma Schema 예시)
```prisma
model User {
  id        String   @id @default(cuid())
  name      String?
  email     String   @unique
  image     String?
  invoices  Invoice[]
  createdAt DateTime @default(now())
}

model Invoice {
  id            String   @id @default(cuid())
  title         String?
  customerName  String?
  customerEmail String?
  amount        Float?
  logoUrl       String?
  user          User     @relation(fields: [userId], references: [id])
  userId        String
  createdAt     DateTime @default(now())
}

## PDF 생성
클라이언트 사이드에서 jsPDF 활용 → 인보이스 + 로고 이미지를 포함한 PDF 다운로드
이미지 업로드 시 FileReader API로 Base64 변환 → doc.addImage()

import jsPDF from "jspdf";

function downloadInvoice(invoiceData, logoBase64) {
  const doc = new jsPDF();
  if (logoBase64) doc.addImage(logoBase64, "PNG", 10, 10, 50, 20);
  doc.text(`Invoice for ${invoiceData.customerName}`, 20, 50);
  doc.text(`Amount: $${invoiceData.amount}`, 20, 70);
  doc.save("invoice.pdf");
}