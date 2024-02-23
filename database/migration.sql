CREATE TABLE users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT CHECK(type IN ('employer', 'employee')) NOT NULL,
    hashed_password BLOB NOT NULL,
    hourly_wage INTEGER NOT NULL
);

CREATE TABLE attendance_records (
    user_id TEXT,
    time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    state TEXT NOT NULL CHECK(state IN ('checkIn', 'checkOut', 'brakeStart', 'brakeEnd')),
    PRIMARY KEY (user_id, time),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE shift_requests (
    user_id TEXT,
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,
    PRIMARY KEY (user_id, start_time),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE confirmed_shift (
    user_id TEXT,
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,
    PRIMARY KEY (user_id, start_time),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
