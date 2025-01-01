import mixpanel from "mixpanel-browser";

const token = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;

mixpanel.init(token as string, {
  track_pageview: true,
  persistence: "localStorage",
});

export default mixpanel;
