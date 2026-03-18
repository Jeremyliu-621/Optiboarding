export async function fetchUserProfile(accessToken: string) {
  const res = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/vnd.github.v3+json",
    },
  });
  if (!res.ok) throw new Error("Failed to fetch profile");
  return res.json();
}

export async function fetchUserRepos(accessToken: string) {
  const res = await fetch("https://api.github.com/user/repos?sort=updated&per_page=10", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/vnd.github.v3+json",
    },
  });
  if (!res.ok) throw new Error("Failed to fetch repos");
  return res.json();
}

export async function fetchUserEvents(accessToken: string, username: string) {
  const res = await fetch(`https://api.github.com/users/${username}/events?per_page=20`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/vnd.github.v3+json",
    },
  });
  if (!res.ok) throw new Error("Failed to fetch events");
  return res.json();
}

export async function fetchUserOrgs(accessToken: string) {
  const res = await fetch("https://api.github.com/user/orgs", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/vnd.github.v3+json",
    },
  });
  if (!res.ok) throw new Error("Failed to fetch orgs");
  return res.json();
}
