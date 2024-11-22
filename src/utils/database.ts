import fs from "fs";
import path  from "path";

const filePath = path.join(__dirname, 'db.json');

interface UserProfile {
    id: string;
    points: number;
}

let database: any = {
    users: {},
    timestamp: new Date().toISOString()
};

export const initDatabase = async () => {
    // Check if the file exists
    if (!fs.existsSync(filePath)) {
        // Write the default content to the file
        fs.writeFileSync(filePath, JSON.stringify(database, null, 2), 'utf-8');
        console.log(`File created: ${filePath}`);
    } else {
        console.log(`File already exists: ${filePath}`);

        // Read the file synchronously
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        
        // Parse the file content as JSON
        database = JSON.parse(fileContent);
    }
}

const saveDatabase = async () => {
    fs.writeFileSync(filePath, JSON.stringify({
        users: database.users,
        timestamp: new Date().toISOString()
    }, null, 2), 'utf-8');
    console.log(`File saved: ${filePath}`);
}

export const getUser = (id: string): UserProfile => {
    if (!database.users[id]) {
        database.users[id] = { id, points: 0 };
    }
    return database.users[id];
};

export const addPoints = (id: string, points: number): number => {
    const user = getUser(id);
    user.points += points;
    saveDatabase();
    return user.points;
};

export const getPoints = (id: string): number => {
    return getUser(id).points;
};
