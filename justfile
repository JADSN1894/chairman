# List possible commands
list:
    @just --list

# Run in development mode
dev:
   @npm run dev

prod:
   @rm --recursive --force build
   @npm run build
   @python3 -m http.server --directory build

# Clean
clean:
    @rm -rf .dfx node_modules package-lock.json 
    @npm cache clean target --force

# Reset project to t0
reset-setup: clean
   @npm install
   @just dev 

# Build and preview
preview:
    @npm run build
    @npm run preview

# Update packages
update-pkgs: clean
    @npm update --save --all

# Show all ports LISTEN
show-listen-ports:
    @ss -apt | grep LISTEN

# Kill process by pid
kill-by-pid pid:
    @kill 9 ${pid}

# Move to main branch
checkout-main:
    @git checkout main 
    @git pull --all --prune

# Remove git cache
remove-git-cache:
    @git rm -rf --cached .