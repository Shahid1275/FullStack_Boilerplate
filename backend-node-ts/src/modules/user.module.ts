/**
 * User Module - User feature module
 * Groups all user-related components
 */

import { Router } from 'express';

export class UserModule {
  private router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // GET /users
    this.router.get('/', (req, res) => {
      res.json({ message: 'Get all users' });
    });

    // GET /users/:id
    this.router.get('/:id', (req, res) => {
      res.json({ message: `Get user ${req.params.id}` });
    });

    // POST /users
    this.router.post('/', (req, res) => {
      res.json({ message: 'Create user' });
    });

    // PUT /users/:id
    this.router.put('/:id', (req, res) => {
      res.json({ message: `Update user ${req.params.id}` });
    });

    // DELETE /users/:id
    this.router.delete('/:id', (req, res) => {
      res.json({ message: `Delete user ${req.params.id}` });
    });

    // GET /users/:id/profile
    this.router.get('/:id/profile', (req, res) => {
      res.json({ message: `Get user ${req.params.id} profile` });
    });
  }

  getRouter(): Router {
    return this.router;
  }
}
