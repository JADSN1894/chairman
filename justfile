# List possible commands
list:
    @just --list

# Run in development mode
dev:
    npm run dev

# Reset project to t0
reset-setup:
   @rm -rf .dfx node_modules package-lock.json 
   @npm cache clean target --force 
   @npm install
   @just dev 

# Build and preview
preview:
    @npm run build
    @npm run preview

# Show all ports LISTEN
show-listen-ports:
    @ss -apt | grep LISTEN

# Kill process by pid
kill-by-pid pid:
    @kill 9 ${pid}

# Remove git cache
remove-git-cache:
    @git rm -rf --cached .