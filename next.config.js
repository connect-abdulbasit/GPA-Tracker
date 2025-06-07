/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Only add the rule if we're in production
    if (process.env.NODE_ENV === 'production') {
      config.module.rules.push({
        test: /@supabase\/realtime-js/,
        use: 'ignore-loader'
      })
    }
    
    // Optimize webpack cache
    config.cache = {
      type: 'filesystem',
      buildDependencies: {
        config: [__filename]
      },
      compression: 'gzip',
      maxAge: 172800000 // 2 days
    }
    
    return config
  }
}

module.exports = nextConfig 