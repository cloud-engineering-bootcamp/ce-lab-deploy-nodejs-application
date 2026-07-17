# Deploy Node.js Application Lab - Solution

**Student Name:** Julio Cesar Aldana Almanza
**Date Completed:** 07/17/2026

---

# Environment Details

| Item | Value |
|------|-------|
| Instance ID | i-03ddc9a164600a60b |
| Region | us-east-1 |
| Public IP | 54.173.29.51 |
| Node.js Version | v18.20.8 |
| App Name (PM2) | myapp |
| App Port | 8080 |

---

# Step 1: Install Node.js

- [x] Installed Node.js with `sudo dnf install -y nodejs`
- [x] `node -v` prints a version number

**My Node.js version:** `v18.20.8`

---

# Step 2: Create the Application

- [x] Created `~/app` and ran `npm init -y`
- [x] Installed `express`
- [x] Created `app.js` with `/` and `/health` routes

---

# Step 3: Install and Start PM2

## Screenshot 1 – PM2 List (Online)

```
screenshots/01-pm2-list-online.png
```

![PM2 List Online](screenshots/01-pm2-list-online.png)

---

- [x] Installed PM2 globally with `sudo npm install -g pm2`
- [x] Created `ecosystem.config.js` setting `NODE_ENV=production` and `PORT=8080`
- [x] Started the app with `pm2 start ecosystem.config.js`
- [x] `pm2 list` shows `status: online`, restart count 0
- [x] `curl localhost:8080/health` returns `{"status":"healthy",...}`
- [x] `curl localhost:8080/` shows `"environment":"production"`

---

# Step 4: Configure the Application to Survive a Reboot

## Screenshot 2 – PM2 Startup Enabled

```
screenshots/02-pm2-startup-enabled.png
```

![PM2 Startup Enabled](screenshots/02-pm2-startup-enabled.png)

---

- [x] Ran `pm2 startup` and copied the printed `sudo env PATH=...` command
- [x] Ran that printed command
- [x] Ran `pm2 save` to persist the process list
- [x] `systemctl is-enabled pm2-ec2-user` prints `enabled`

---

# Step 5: Configure Nginx

- [x] Installed Nginx with `sudo dnf install -y nginx`
- [x] Created `/etc/nginx/conf.d/app.conf` proxying port 80 → 8080, marked `default_server`
- [x] Removed the stock `listen 80 default_server;` line from `nginx.conf`
- [x] `sudo nginx -t` passes
- [x] Enabled and started Nginx with `sudo systemctl enable --now nginx`

---

# Step 6: Test the Full Chain

## Screenshot 3 – Health Endpoint

```
screenshots/03-health-endpoint.png
```

![Health Endpoint](screenshots/03-health-endpoint.png)

---

- [x] `curl localhost/health` on the instance returns `{"status":"healthy",...}`
- [x] `curl http://YOUR_PUBLIC_IP/health` from my laptop returns the same
- [x] `curl http://YOUR_PUBLIC_IP/` shows `"environment":"production"`

---

# Step 7: Verify Automatic Restart After a Crash

## Screenshot 5 – Crash Recovery

```
screenshots/05-crash-recovery.png
```

![Crash Recovery](screenshots/05-crash-recovery.png)

---

- [x] Noted the restart count in `pm2 list` before the crash
- [x] Ran `kill -9 $(pm2 pid myapp)`
- [x] `pm2 list` shows the restart count (`↺`) incremented and status back to `online`

---

# Step 8: Verify the Application Survives a Reboot

## Screenshot 4 – After Reboot

```
screenshots/04-after-reboot.png
```

![After Reboot](screenshots/04-after-reboot.png)

---

- [x] Ran `sudo reboot`
- [x] Waited ~60 seconds and reconnected
- [x] Without starting anything manually, `pm2 list` shows `myapp` online
- [x] `curl localhost/health` responds successfully

---

# Questions

## Deployment Process
	1. Install Node.js 
	2. Create the application (development, health and environment responses)
	3. Install PM2
	4. Configure PM2 ecosystem selecting the app.js file created and start PM2
	5. Configure app to survive crash and reboot. 
	6. Configure Nginx for the app to listen from outside the server. 
	7. Verification and test

## Why PM2 instead of node app.js &
PM2 handles the problem when the server is crashed or reboot to keep the app working after that. 

## Proof that app survives a reboot
Forcing crash and reboot EC2 instance and then check with pm2 list command if the app is in online status again
---

# Submission Checklist

Repository name: `ce-lab-deploy-nodejs` (**public**)

- [x] `application/` files committed (`app.js`, `package.json`, `ecosystem.config.js`)
- [x] `configs/app.conf` committed
- [x] `deploy.sh` committed, capturing the commands run
- [x] All 5 screenshots present
- [x] `README.md` complete with deployment process, why PM2 over `node app.js &`, and reboot proof
- [x] App online under PM2 with 0 unexpected restarts
- [x] PM2 startup service enabled (`systemctl is-enabled pm2-ec2-user`)
- [x] Nginx reverse proxy working (port 80 → 8080)
- [x] `/health` endpoint reachable from outside the instance
- [x] Crash recovery demonstrated (`kill -9` → auto-restart)
- [x] Reboot survival demonstrated
- [x] Repository URL submitted
