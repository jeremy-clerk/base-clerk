# Auto Accept Org Invitations
## Setup
### First Steps
- Enable 'Verified Domains' in the [Clerk Dashboard](https://dashboard.clerk.com/last-active?path=organizations-settings)
- Create an Organization and [add a Verified Domain](https://clerk.com/docs/organizations/verified-domains#verified-domains)
- Enable the option for 'Automatic Invitations'
- [Customize your session token](https://clerk.com/docs/backend-requests/making/custom-session-token#customize-your-session-token) (optional)


![Claims](/public/claims.png)

### Setup

Clone this repo and branch:
```bash
git clone -b auto-org-invite https://github.com/jeremy-clerk/base-clerk.git
 ```
- Copy the `.env.example` to `.env.local`
- Copy and paste your publishableKey and secretKey from the [Clerk Dashboard](https://dashboard.clerk.com/last-active?path=api-keys) into the `.env.local` you just copied.

Install dependencies
```bash
pnpm i
```

Start the example app
```bash
pnpm dev
```

Go to `http://localhost:3000/sign-up`

Sign up with a new account that has the same domain as your organization with the verified domain.

The user should be automatically added to the organization after sign up and redirected to `/org/profile`.


### How This Example Works

Using the `auth()` method in the `clerkMiddleware` we detect whether the user has an active Organization. 

If they don't, we redirect them to the `/org/join` page, where we retrieve their Organization invites, and accept an invite. 
If it was successful, we set the Organization the user just joined as active and redirect to the `/org/profile`.

### Things To Note
The `/org/join` route is assuming only a single Organization invite. In production, it would be recommended to filter
these invitations or accept each one. 

If a User is a member of an Organization, but it's not set as active, they will end up at the `/org/join` route. It would
be advised to provide a `<OrganizationSwitcher />` component. You could also retrieve their org memberships or `lastActiveOrg`
and set that as active, then redirect. 

This is just an example of auto adding a user to an organization after sign up using the verified domains feature.
It has not been thoroughly tested and is a quick demo.

