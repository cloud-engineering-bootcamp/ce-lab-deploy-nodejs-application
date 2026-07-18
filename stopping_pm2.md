
If you want to **stop PM2 and remove the automatic restart feature**, follow these steps.

### 1. Stop the application managed by PM2

First check:

```bash
pm2 list
```

You have:

```text
myapp
```

Stop it:

```bash
pm2 stop myapp
```

---

### 2. Remove the app from PM2 management

```bash
pm2 delete myapp
```

Check:

```bash
pm2 list
```

Expected:

```text
┌────┬──────┬────────┐
│ id │ name │ status │
└────┴──────┴────────┘
```

No applications should appear.

---

### 3. Disable PM2 auto-start after reboot

If you previously ran:

```bash
pm2 startup
pm2 save
```

remove the startup service:

```bash
pm2 unstartup
```

It will print a command similar to:

```bash
sudo env PATH=$PATH:/usr/bin pm2 unstartup systemd -u ec2-user --hp /home/ec2-user
```

Copy and execute that command.

---

### 4. Remove saved PM2 processes

Run:

```bash
pm2 save --force
```

This clears the saved process list.

---

### 5. (Optional) Completely remove PM2

If you do not want PM2 installed anymore:

```bash
sudo npm uninstall pm2 -g
```

Verify:

```bash
pm2 -v
```

You should get:

```text
command not found
```

---

### 6. Check Node process is gone

Run:

```bash
ps aux | grep node
```

If your app is still running:

```bash
kill -9 PID_NUMBER
```

Example:

```bash
kill -9 1858
```

---

After this, your Node app will **not automatically restart** after:

* application crash ❌
* EC2 reboot ❌
* SSH logout ❌

It will only run when you manually start it:

```bash
node app.js
```

or:

```bash
npm start
```
