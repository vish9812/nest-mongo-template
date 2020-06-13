'use strict';

import { Schema, model } from 'mongoose';

const TaskSchema = new Schema({
  title: String,
  description: String,
  status: String,
});

export default model('Task', TaskSchema);
