@echo off
echo Setting up Git repository...

REM Check if remote exists
git remote -v

REM If origin doesn't exist, add it
git remote add origin https://github.com/RiyazR2/Foodie-Food.git 2>nul

REM Set remote URL (in case it already exists)
git remote set-url origin https://github.com/RiyazR2/Foodie-Food.git

echo.
echo Adding all files...
git add .

echo.
echo Committing changes...
git commit -m "feat: Add AI features - Smart Search, Restaurant Insights, Recipe Generator"

echo.
echo Pushing to GitHub...
git branch -M main
git push -u origin main --force

echo.
echo Done! Check GitHub: https://github.com/RiyazR2/Foodie-Food
pause
