export default function logout(req, res) {
    res.setHeader('Set-Cookie', 'recipediaToken=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT');
    res.send({
        logout : true
    });
}