# PowerShell script to copy missing design system folders/files from OurSynth-Eco to your current halo-ui package
# Adjust the source/destination paths if your structure is different

$sourceRoot = "c:\Users\davos\all-oursynth-code\OurSynth-Eco\apps\Halo-UI\src"
$destRoot = "c:\Users\davos\OurSynth-main\packages\halo-ui\src"

# Copy folders
$folders = @("contexts", "hooks", "ui")
foreach ($folder in $folders) {
    $src = Join-Path $sourceRoot $folder
    $dst = Join-Path $destRoot $folder
    if (Test-Path $src) {
        Write-Host "Copying $src -> $dst"
        Copy-Item $src $dst -Recurse -Force
    } else {
        Write-Host "Source folder missing: $src" -ForegroundColor Yellow
    }
}

# Copy ThemeLayout.tsx
$themeLayoutSrc = Join-Path $sourceRoot "layout\ThemeLayout.tsx"
$themeLayoutDst = Join-Path $destRoot "layout\ThemeLayout.tsx"
if (Test-Path $themeLayoutSrc) {
    Write-Host "Copying $themeLayoutSrc -> $themeLayoutDst"
    Copy-Item $themeLayoutSrc $themeLayoutDst -Force
} else {
    Write-Host "ThemeLayout.tsx not found in source." -ForegroundColor Yellow
}

Write-Host "Copy complete. You can now rebuild your halo-ui package."
