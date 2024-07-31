// purge all objects across all deploys for this site



export default async () => {

  console.log("Purging everything");

  await purgeCache();

  return new Response("Purged!", { status: 202 })
};
