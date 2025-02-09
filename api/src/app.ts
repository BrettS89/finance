import 'express-async-errors';
import express from 'express';
import cors from 'cors';
// import helmet from 'helmet';
import { errorHandler } from './middleware/error-handler';
import { NotFoundError } from './errors';

import { expenseTypeRouter } from './services/expense-type/controllers';
import { expenseRouter } from './services/expense/controllers';
import { surplusRouter } from './services/surplus/controllers';
import { groceryRouter } from './services/grocery/controllers';

const app = express();

app.use(express.json());
app.use(cors());
// app.use(helmet());

app.use(expenseTypeRouter);
app.use(expenseRouter);
app.use(surplusRouter);
app.use(groceryRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError('Path not found');
});

app.use(errorHandler);

export { app };
