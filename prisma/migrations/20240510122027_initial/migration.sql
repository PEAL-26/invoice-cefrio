-- CreateTable
CREATE TABLE "customers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "taxpayer" TEXT,
    "telephone" TEXT,
    "email" TEXT,
    "address" TEXT,
    "location" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DECIMAL(65,30),
    "unit_measure" TEXT,
    "iva" DECIMAL(65,30),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoices" (
    "id" TEXT NOT NULL,
    "number" VARCHAR(100) NOT NULL,
    "type" VARCHAR(150) NOT NULL,
    "customer_id" TEXT NOT NULL,
    "customer_discount" DECIMAL(65,30) DEFAULT 0.00,
    "financial_discount" DECIMAL(65,30) DEFAULT 0.00,
    "currency" TEXT,
    "exchange" DECIMAL(65,30) DEFAULT 0.00,
    "date" TIMESTAMP(3) NOT NULL,
    "due_Date" TIMESTAMP(3),
    "payment_condition" TEXT,
    "reference" TEXT,
    "observation" TEXT,
    "tax_amount" DECIMAL(65,30) DEFAULT 0.00,
    "reason_exemption" TEXT,
    "total" DECIMAL(65,30) DEFAULT 0.00,
    "total_iva" DECIMAL(65,30) DEFAULT 0.00,
    "total_discount" DECIMAL(65,30) DEFAULT 0.00,
    "total_withholding_tax" DECIMAL(65,30) DEFAULT 0.00,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "invoices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoice_products" (
    "id" TEXT NOT NULL,
    "product_id" TEXT,
    "invoice_id" TEXT NOT NULL,
    "date" TIMESTAMP(3),
    "product_name" TEXT NOT NULL,
    "unit_measure" TEXT,
    "price" DECIMAL(65,30) DEFAULT 0.00,
    "quantity" DECIMAL(65,30) DEFAULT 0.00,
    "discount" DECIMAL(65,30) DEFAULT 0.00,
    "iva" DECIMAL(65,30) DEFAULT 0.00,
    "total" DECIMAL(65,30) DEFAULT 0.00,
    "paid" DECIMAL(65,30) DEFAULT 0.00,

    CONSTRAINT "invoice_products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoice_payments" (
    "id" TEXT NOT NULL,
    "invoice_id" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "invoice_payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "banks" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "abbreviation" TEXT NOT NULL,
    "account" TEXT NOT NULL,
    "iban" TEXT NOT NULL,

    CONSTRAINT "banks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "companies" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "telephone" TEXT,
    "address" TEXT,
    "taxpayer" TEXT,
    "location" TEXT,
    "logo" TEXT,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "customers_id_key" ON "customers"("id");

-- CreateIndex
CREATE UNIQUE INDEX "products_id_key" ON "products"("id");

-- CreateIndex
CREATE UNIQUE INDEX "invoices_id_key" ON "invoices"("id");

-- CreateIndex
CREATE UNIQUE INDEX "invoices_number_key" ON "invoices"("number");

-- CreateIndex
CREATE UNIQUE INDEX "invoice_products_id_key" ON "invoice_products"("id");

-- CreateIndex
CREATE UNIQUE INDEX "invoice_payments_id_key" ON "invoice_payments"("id");

-- CreateIndex
CREATE UNIQUE INDEX "banks_id_key" ON "banks"("id");

-- CreateIndex
CREATE UNIQUE INDEX "companies_id_key" ON "companies"("id");

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice_products" ADD CONSTRAINT "invoice_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice_products" ADD CONSTRAINT "invoice_products_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "invoices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice_payments" ADD CONSTRAINT "invoice_payments_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "invoices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
