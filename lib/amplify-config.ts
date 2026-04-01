export const amplifyConfig = {
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID || 'us-east-1_placeholder',
      userPoolClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID || 'placeholder',
      loginWith: {
        email: true,
      },
      signUpVerificationMethod: 'code' as const,
      userAttributes: {
        email: { required: true },
        name: { required: true },
        'custom:role': { required: true },
      },
    },
  },
};
