export const isSubscriptionActive = (user) => {
  return (
    user?.subscriptionStatus === "active" &&
    user?.subscriptionEnd &&
    new Date(user.subscriptionEnd) > new Date()
  );
};