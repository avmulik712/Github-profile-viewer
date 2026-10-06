
async function getProfile() {

    // Get username from input
    let username = document.getElementById("username").value.trim();

    // Check if input is empty
    if (username === "") {

        document.getElementById("result").innerHTML = `
            <div class="welcome">
                <h2>Please enter a GitHub username</h2>
                <p>Enter a username to search for a profile.</p>
            </div>
        `;

        return;
    }


    try {

        // Get profile data from GitHub API
        let profileResponse =
            await fetch(`https://api.github.com/users/${username}`);


        // Check if user exists
        if (!profileResponse.ok) {
            throw new Error("User not found");
        }


        // Convert profile response to JSON
        let data = await profileResponse.json();


        // Get repository data from GitHub API
        let repoResponse =
            await fetch(`https://api.github.com/users/${username}/repos`);


        // Convert repository response to JSON
        let repos = await repoResponse.json();


        // Create repository list
        let repoList = "";


        repos.forEach(function(repo) {

            repoList += `
                <div class="repo-card">

                    <h3>${repo.name}</h3>

                    <p>
                        ${repo.description || "No description available"}
                    </p>

                    <div class="repo-info">

                        <span>
                            ⭐ ${repo.stargazers_count}
                        </span>

                        <span>
                            🍴 ${repo.forks_count}
                        </span>

                        <span>
                            💻 ${repo.language || "No language"}
                        </span>

                    </div>

                    <a
                        href="${repo.html_url}"
                        target="_blank"
                    >
                        View Repository →
                    </a>

                </div>
            `;

        });


        // Display profile and repositories
        document.getElementById("result").innerHTML = `

            <div class="profile-card">

                <img
                    src="${data.avatar_url}"
                    class="profile-image"
                    alt="Profile Picture"
                >

                <h2>${data.name || data.login}</h2>

                <p class="username">
                    @${data.login}
                </p>

                <p class="bio">
                    ${data.bio || "No bio available"}
                </p>


                <div class="stats">

                    <div>
                        <strong>${data.followers}</strong>
                        <span>Followers</span>
                    </div>

                    <div>
                        <strong>${data.following}</strong>
                        <span>Following</span>
                    </div>

                    <div>
                        <strong>${data.public_repos}</strong>
                        <span>Repositories</span>
                    </div>

                </div>


                <a
                    href="${data.html_url}"
                    target="_blank"
                    class="github-button"
                >
                    View GitHub Profile
                </a>

            </div>


            <div class="repositories">

                <h2>Repositories</h2>

                <div class="repo-list">

                    ${repoList}

                </div>

            </div>

        `;

    }


    catch (error) {

        document.getElementById("result").innerHTML = `

            <div class="welcome">

                <h2>❌ User Not Found</h2>

                <p>
                    Please check the GitHub username and try again.
                </p>

            </div>

        `;

    }

}

