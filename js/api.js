import { Octokit } from "https://esm.sh/octokit";
const octokit = new Octokit({});

async function createCard({ name, description, html_url, language }) {
    const link = document.createElement('a');
    link.href = html_url;
    link.className = 'font-medium text-blue-600 dark:text-blue-500 hover:underline';
    link.textContent = 'voir le projet';
    link.target = '_blank';
    
    const card = document.createElement('div');
    card.className = 'bg-white shadow-md rounded-lg p-4 object-contain';

    const title = document.createElement('h2');
    title.className = 'text-lg font-bold mb-2';
    title.textContent = name;

    const desc = document.createElement('p');
    desc.className = 'text-gray-600';
    desc.textContent = description;

    const span = document.createElement('span');
    span.className = 'bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300';
    span.textContent = language

    card.appendChild(title);
    card.appendChild(desc);
    card.appendChild(span);
    card.appendChild(link);

    return card;
}

async function getRepo() {
    return await octokit.request("GET https://api.github.com/users/Vincgllmt/repos").then((rep) => rep.data)
}
const json = await getRepo()
const container = document.getElementById('card-container');
json.forEach(async item => {
    const card = await createCard(item);
    container.appendChild(card);
});
