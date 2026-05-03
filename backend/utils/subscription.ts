export const isSubscriptionActive = (user: any) => {
  return (
    user.subscriptionStatus === "active" &&
    user.subscriptionEnd &&
    new Date(user.subscriptionEnd) > new Date()
  );
};