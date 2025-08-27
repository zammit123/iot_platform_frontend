# Setting up supabase

Use the same account used to create the backend project.

1. Click Connect in the top nav bar. Select `App Frameworks`, and ensure `Framework` is set to Next.js and `Using` is `App Router`
2. Copy the NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY and create a new file name .env.local at the root.
3. Add EXPRESS_API_URL="http://localhost:4000" to the .env.local as well.

# Install project dependencies

run npm install

# Running the server locally

npm run dev

The application start on http://localhost:3000/

This is a next.js application.

# Approach

- The only routes that will work are:
  /, devices/, devices/create and devices/[id]
- This application would grow and need to scale so I've used next.js on the frontend with Material UI for it's comprehensive component library.
- For performance enhancements I have use tanstack query for client side.
- React hook forms has been used as an application like this will have many CRUD operations and complex form logic. This package suits many of those needs.
- Zod has been used to provide schema validation.
- echarts is a very flexible charting library. Given the type of data the application may use, this would be a suitable library to use.

# Other considerations

- Enhancing the look and feel.
- Improving user feedback with things like toast's for messaging and more detailed error messaging.
- Making the application responsive.
- As the number of routes and complexity increases a separate routes file would be needed.
- The application would need an authentication system adding, along with an RBAC system.
- If the application was to be used internationally, then string formatting, timezones etc. would need to be considered.
- A theme switcher would be nice
- Add unit and e2e tests
- Add real-time updates via Supabases websocket solution.
