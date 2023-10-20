import Cookies from 'cookies';

// Optionally define keys to sign cookie values
// to prevent client tampering
const keys = ['empowerHer'];

const handleCookies = async(req, res) => {
    //Create cookies object
    const cookies = new Cookies(req, res, { keys });

    //Get a cookie
    const lastVisit = cookies.get('lastVisit', { signed: true });

    //Set cookie
    cookies.set('lastVisit', new Date().toISOString(), {
        httpOnly: true, // true by default
        secure: false, // true by default
        sameSite: 'strict', // strict by default
    });
    if (!lastVisit) {
        res.setHeader('Content-Type', 'text/plain');
        res.status(200).send('Welcome, first time visitor!');
      } else {
        res.setHeader('Content-Type', 'text/plain');
        res.status(200).send('Welcome back! Nothing much changed since your last visit at ' + lastVisit + '.');
      }
}
export default handleCookies;
