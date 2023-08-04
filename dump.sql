--
-- PostgreSQL database dump
--

-- Dumped from database version 14.8 (Ubuntu 14.8-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.8 (Ubuntu 14.8-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: logged; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.logged (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    token text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now()
);


--
-- Name: logged_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.logged_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: logged_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.logged_id_seq OWNED BY public.logged.id;


--
-- Name: shorts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.shorts (
    "userId" integer NOT NULL,
    "shortId" integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now()
);


--
-- Name: urls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    "shortUrl" text NOT NULL,
    url text NOT NULL,
    "visitCount" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now()
);


--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now()
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: logged id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.logged ALTER COLUMN id SET DEFAULT nextval('public.logged_id_seq'::regclass);


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: logged; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.logged VALUES (1, 'andressa', 'andressafirmino@gmail.com', 'bbcbf0a8-db19-4eaa-b877-55e3a7017c68', '2023-08-04 16:20:58.211338');
INSERT INTO public.logged VALUES (2, 'andressa', 'andressa@gmail.com', '3d748053-5a0f-47e3-9c10-257699084a6c', '2023-08-04 17:28:42.560966');


--
-- Data for Name: shorts; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.shorts VALUES (1, 2, '2023-08-04 16:27:20.654568');
INSERT INTO public.shorts VALUES (1, 3, '2023-08-04 16:27:24.300523');
INSERT INTO public.shorts VALUES (1, 4, '2023-08-04 16:27:26.122836');
INSERT INTO public.shorts VALUES (1, 5, '2023-08-04 16:36:16.397395');
INSERT INTO public.shorts VALUES (1, 6, '2023-08-04 16:36:29.137845');
INSERT INTO public.shorts VALUES (1, 7, '2023-08-04 16:44:04.513292');
INSERT INTO public.shorts VALUES (1, 8, '2023-08-04 16:45:01.371254');
INSERT INTO public.shorts VALUES (1, 9, '2023-08-04 16:46:13.430883');
INSERT INTO public.shorts VALUES (1, 10, '2023-08-04 16:50:48.922304');
INSERT INTO public.shorts VALUES (1, 11, '2023-08-04 16:51:24.859561');
INSERT INTO public.shorts VALUES (1, 12, '2023-08-04 16:55:29.668998');
INSERT INTO public.shorts VALUES (1, 13, '2023-08-04 16:56:11.656689');
INSERT INTO public.shorts VALUES (1, 14, '2023-08-04 16:59:40.391047');
INSERT INTO public.shorts VALUES (2, 15, '2023-08-04 17:30:04.343684');


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.urls VALUES (1, '5FyK6DnA', 'https://www.figma.com/file/DWg9233KR2GS6RLvfZRwyd/Shortly?type=design&node-id=0-1&mode=design&t=UI1H15lFHhCpa0K5-0', 0, '2023-08-04 16:21:08.917034');
INSERT INTO public.urls VALUES (3, 'kt8bvkcU', 'https://www.figma.com/file/DWg9233KR2GS6RLvfZRwyd/Shortly?type=design&node-id=0-1&mode=design&t=UI1H15lFHhCpa0K5-0', 0, '2023-08-04 16:27:24.287169');
INSERT INTO public.urls VALUES (4, 'zPiuKzZT', 'https://www.figma.com/file/DWg9233KR2GS6RLvfZRwyd/Shortly?type=design&node-id=0-1&mode=design&t=UI1H15lFHhCpa0K5-0', 0, '2023-08-04 16:27:26.117652');
INSERT INTO public.urls VALUES (5, 'BCERAsMF', 'https://bogus-tide.net', 0, '2023-08-04 16:36:16.384612');
INSERT INTO public.urls VALUES (6, 'lowdjnce', 'https://bogus-tide.net', 0, '2023-08-04 16:36:29.126715');
INSERT INTO public.urls VALUES (7, '5FhFhe1Q', 'http://confused-cloak.biz', 0, '2023-08-04 16:44:04.496975');
INSERT INTO public.urls VALUES (8, 'YGGSHp12', 'http://confused-cloak.biz', 0, '2023-08-04 16:45:01.354238');
INSERT INTO public.urls VALUES (9, 'hauX1qY4', 'http://confused-cloak.biz', 0, '2023-08-04 16:46:13.418078');
INSERT INTO public.urls VALUES (10, 'C-biKnAF', 'http://confused-cloak.biz', 0, '2023-08-04 16:50:48.908047');
INSERT INTO public.urls VALUES (11, 'ZXCfKuHq', 'http://confused-cloak.biz', 0, '2023-08-04 16:51:24.850205');
INSERT INTO public.urls VALUES (12, 'McFprdvz', 'http://confused-cloak.biz', 0, '2023-08-04 16:55:29.649372');
INSERT INTO public.urls VALUES (13, 'linFxltE', 'http://confused-cloak.biz', 0, '2023-08-04 16:56:11.64161');
INSERT INTO public.urls VALUES (14, 'K-f0LfeU', 'http://confused-cloak.biz', 0, '2023-08-04 16:59:40.376539');
INSERT INTO public.urls VALUES (15, 'EoHl2cjv', 'http://confused-cloak.biz', 0, '2023-08-04 17:30:04.330496');
INSERT INTO public.urls VALUES (2, 'O7qLWqiv', 'https://www.figma.com/file/DWg9233KR2GS6RLvfZRwyd/Shortly?type=design&node-id=0-1&mode=design&t=UI1H15lFHhCpa0K5-0', 2, '2023-08-04 16:27:20.64952');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'andressa', 'andressafirmino@gmail.com', '$2b$10$ai7MNitgQdJJURsH.azbNuHg2IxfPOV1PB6C40IqUUUugdNeJdXQe', '2023-08-04 16:20:54.029223');
INSERT INTO public.users VALUES (2, 'andressa', 'andressa@gmail.com', '$2b$10$yno9lEOZI2iSGocH.KaaE.x6RB3.PvWlm3s0DXG0NEsipY1qSAhoq', '2023-08-04 17:28:35.368109');


--
-- Name: logged_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.logged_id_seq', 2, true);


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.urls_id_seq', 15, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 2, true);


--
-- Name: logged logged_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.logged
    ADD CONSTRAINT logged_pkey PRIMARY KEY (id);


--
-- Name: logged logged_token_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.logged
    ADD CONSTRAINT logged_token_key UNIQUE (token);


--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- Name: urls urls_shortUrl_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT "urls_shortUrl_key" UNIQUE ("shortUrl");


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: logged logged_email_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.logged
    ADD CONSTRAINT logged_email_fkey FOREIGN KEY (email) REFERENCES public.users(email);


--
-- Name: shorts shorts_shortId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shorts
    ADD CONSTRAINT "shorts_shortId_fkey" FOREIGN KEY ("shortId") REFERENCES public.urls(id);


--
-- Name: shorts shorts_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shorts
    ADD CONSTRAINT "shorts_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

