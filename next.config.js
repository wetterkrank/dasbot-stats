module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/chats',
        permanent: true,
      },
    ]
  },
}