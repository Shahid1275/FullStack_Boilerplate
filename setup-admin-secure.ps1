# 🔐 Setup Secure Admin Credentials
# Run this script to create .env files with secure passwords

Write-Host "🔐 Security Setup - Admin Credentials" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# Function to generate secure password
function Generate-SecurePassword {
    $length = 16
    $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*"
    $password = -join ((1..$length) | ForEach-Object { $chars[(Get-Random -Maximum $chars.Length)] })
    return $password
}

Write-Host "⚠️  WARNING: This will create/update .env files with secure passwords" -ForegroundColor Yellow
Write-Host ""
$continue = Read-Host "Continue? (y/n)"

if ($continue -ne 'y' -and $continue -ne 'Y') {
    Write-Host "❌ Aborted" -ForegroundColor Red
    exit
}

Write-Host ""
Write-Host "Generating secure admin credentials..." -ForegroundColor Green

# Generate secure password
$adminPassword = Generate-SecurePassword
$adminEmail = Read-Host "Enter admin email (default: admin@example.com)"
if ([string]::IsNullOrWhiteSpace($adminEmail)) {
    $adminEmail = "admin@example.com"
}

$adminName = Read-Host "Enter admin name (default: Admin User)"
if ([string]::IsNullOrWhiteSpace($adminName)) {
    $adminName = "Admin User"
}

Write-Host ""
Write-Host "📋 Credentials Generated:" -ForegroundColor Cyan
Write-Host "  Name: $adminName" -ForegroundColor White
Write-Host "  Email: $adminEmail" -ForegroundColor White
Write-Host "  Password: $adminPassword" -ForegroundColor Yellow
Write-Host ""
Write-Host "⚠️  SAVE THIS PASSWORD SECURELY! It won't be shown again." -ForegroundColor Red
Write-Host ""

# Backend Node.js
$nodejsPath = "backend-node-js\.env"
if (Test-Path $nodejsPath) {
    Write-Host "📝 Updating $nodejsPath..." -ForegroundColor Yellow
} else {
    Write-Host "📝 Creating $nodejsPath..." -ForegroundColor Green
    Copy-Item "backend-node-js\.env.example" $nodejsPath
}

# Append admin credentials
$adminConfig = @"

# Admin User Seed (Generated on $(Get-Date -Format "yyyy-MM-dd HH:mm:ss"))
ADMIN_NAME=$adminName
ADMIN_EMAIL=$adminEmail
ADMIN_PASSWORD=$adminPassword
"@

Add-Content -Path $nodejsPath -Value $adminConfig
Write-Host "✅ Backend Node.js .env updated" -ForegroundColor Green

# Backend Node.ts
$nodetsPath = "backend-node-ts\.env"
if (Test-Path $nodetsPath) {
    Write-Host "📝 Updating $nodetsPath..." -ForegroundColor Yellow
} else {
    Write-Host "📝 Creating $nodetsPath..." -ForegroundColor Green
    Copy-Item "backend-node-ts\.env.example" $nodetsPath
}

Add-Content -Path $nodetsPath -Value $adminConfig
Write-Host "✅ Backend Node.ts .env updated" -ForegroundColor Green

Write-Host ""
Write-Host "🎉 Setup Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📌 Next Steps:" -ForegroundColor Cyan
Write-Host "  1. Save the password in a secure location (e.g., password manager)" -ForegroundColor White
Write-Host "  2. Never commit .env files to Git" -ForegroundColor White
Write-Host "  3. Change the password after first login" -ForegroundColor White
Write-Host "  4. Run: npm run seed (to create admin user)" -ForegroundColor White
Write-Host ""
Write-Host "🔒 Security Reminder:" -ForegroundColor Yellow
Write-Host "  - .env files are in .gitignore" -ForegroundColor White
Write-Host "  - Never share your password" -ForegroundColor White
Write-Host "  - Use different passwords for dev/staging/production" -ForegroundColor White
Write-Host ""
