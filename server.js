const express = require('express');
const fs = require('fs');
const path = require('path');
const uuid = require('./helpers/uuid');

const app = express();

const PORT = process.env.PORT || 3000;
