const app = express();
const port = process.env.PORT || 8080;             // use PORT from the environment, else default to 8080

// Root route: returns basic info about the running instance as JSON
app.get('/', (req, res) => {
  res.json({
    message: 'Week 2 Deployment Lab',
    hostname: os.hostname(),                        // this instance's hostname
    uptime: process.uptime(),                       // seconds since the app started
    environment: process.env.NODE_ENV || 'development'  // set to 'production' by PM2 in Step 3
  });
});

// Health check route: a lightweight endpoint monitors/load balancers can poll
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date() });
});

// Start listening for HTTP requests on the chosen port
app.listen(port, () => console.log(`Server running on port ${port}`));
