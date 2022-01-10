-- CREATES REPORT TABLE
CREATE TABLE public.report (
	exec_uid uuid NOT NULL,
	round int4 NOT NULL,
	concurrency int4 NOT NULL,
	app_type varchar NOT NULL,
	status varchar NOT NULL,
	started_at timestamp NOT null,
	ended_at timestamp NOT NULL
);

-- CREATES SAMPLE TABLE: BOOK
CREATE TABLE public.book (
	uid uuid NOT NULL,
	author varchar NULL,
	title varchar NULL,
	description varchar NULL,
	code int4 NULL,
	CONSTRAINT book_pk PRIMARY KEY (uid)
);
