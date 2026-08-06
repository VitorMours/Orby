import { z } from "zod";


const SessionSchema = z.object({
    access_token: z.string(),
    refresh_token: z.string(),
    expires_at: z.number(),
    expires_in: z.number(),
    token_type: z.string()

});


export type Session = z.infer<typeof SessionSchema>;

// session: {
//     access_token: 'eyJhbGciOiJFUzI1NiIsImtpZCI6ImQwY2M0YWI0LWU1ZmYtNDQwMy04MDc0LWRlZDAxOTBjMjc0NyIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2J3dmN6eG5sY3Z1dmN4a2x0b3pjLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiIyNWRlYTgwNi00ODc5LTRhMzMtOGIwNy0yMTc4YjhjNGMzZjMiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzg1OTc5NTU5LCJpYXQiOjE3ODU5NzU5NTksImVtYWlsIjoiam9hb3YucmV6ZW5kZW1vdXJhQGdtYWlsLmNvbSIsInBob25lIjoiIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZW1haWwiLCJwcm92aWRlcnMiOlsiZW1haWwiXX0sInVzZXJfbWV0YWRhdGEiOnsiZW1haWwiOiJqb2Fvdi5yZXplbmRlbW91cmFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBob25lX3ZlcmlmaWVkIjpmYWxzZSwic3ViIjoiMjVkZWE4MDYtNDg3OS00YTMzLThiMDctMjE3OGI4YzRjM2YzIn0sInJvbGUiOiJhdXRoZW50aWNhdGVkIiwiYWFsIjoiYWFsMSIsImFtciI6W3sibWV0aG9kIjoicGFzc3dvcmQiLCJ0aW1lc3RhbXAiOjE3ODU5NzU5NTl9XSwic2Vzc2lvbl9pZCI6ImQ5ZmYzZWJiLWRjODEtNGU0Yi05NTJmLTI1Y2Y1MTc3NzY1YyIsImlzX2Fub255bW91cyI6ZmFsc2V9.IpUQa48ilPSMlAPbMMatGZA9Zp19r9-Z1n3uB2daqEgDQjRJ5Cd_pZ_-eijV0vVf9wdWNXrW5379-gpyTjLkSg',
//     token_type: 'bearer',
//     expires_in: 3600,
//     expires_at: 1785979559,
//     refresh_token: '5p6qkrysxsqz',
//     user: {
//       id: '25dea806-4879-4a33-8b07-2178b8c4c3f3',
//       aud: 'authenticated',
//       role: 'authenticated',
//       email: 'joaov.rezendemoura@gmail.com',
//       email_confirmed_at: '2026-08-06T00:24:00.700715Z',
//       phone: '',
//       confirmation_sent_at: '2026-08-06T00:23:44.63519Z',
//       confirmed_at: '2026-08-06T00:24:00.700715Z',
//       last_sign_in_at: '2026-08-06T00:25:59.091728995Z',
//       app_metadata: [Object],
//       user_metadata: [Object],
//       identities: [Array],
//       created_at: '2026-08-06T00:23:44.599374Z',
//       updated_at: '2026-08-06T00:25:59.095751Z',
//       is_anonymous: false
//     },
//     weak_password: null
//   }