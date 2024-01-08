import { NextApiRequest, NextApiResponse } from 'next';
import { destroyCookie, parseCookies } from 'nookies';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'DELETE') {
      destroyCookie({ res }, 'userCredentials', {
        path: '/', // Make sure to set the same path as when setting the cookie
      });
      res.status(200).json({ success: true, message: 'User credentials cookie deleted' });
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  }
