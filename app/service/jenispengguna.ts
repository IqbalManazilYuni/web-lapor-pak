export async function getData() {
    const res = await fetch('http://localhost:5000/api/jenispengaduan', {
        cache: 'no-store'
    });

    return res.json();
}