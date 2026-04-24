--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Category" (
    id integer NOT NULL,
    category text NOT NULL
);


ALTER TABLE public."Category" OWNER TO postgres;

--
-- Name: Category_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Category_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Category_id_seq" OWNER TO postgres;

--
-- Name: Category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Category_id_seq" OWNED BY public."Category".id;


--
-- Name: FileUpload; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."FileUpload" (
    id integer NOT NULL,
    filename text NOT NULL,
    filepath text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "isActive" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."FileUpload" OWNER TO postgres;

--
-- Name: FileUpload_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."FileUpload_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."FileUpload_id_seq" OWNER TO postgres;

--
-- Name: FileUpload_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."FileUpload_id_seq" OWNED BY public."FileUpload".id;


--
-- Name: Ticket; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Ticket" (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    message text NOT NULL,
    status text DEFAULT 'Belum Dikelola'::text NOT NULL,
    "createAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "categoryId" integer NOT NULL,
    "assignedToId" integer,
    "answeredAt" timestamp(3) without time zone,
    "answeredById" integer,
    response text
);


ALTER TABLE public."Ticket" OWNER TO postgres;

--
-- Name: Ticket_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Ticket_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Ticket_id_seq" OWNER TO postgres;

--
-- Name: Ticket_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Ticket_id_seq" OWNED BY public."Ticket".id;


--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id integer NOT NULL,
    username text NOT NULL,
    name text,
    role text NOT NULL,
    password text NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."User_id_seq" OWNER TO postgres;

--
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: Category id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Category" ALTER COLUMN id SET DEFAULT nextval('public."Category_id_seq"'::regclass);


--
-- Name: FileUpload id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."FileUpload" ALTER COLUMN id SET DEFAULT nextval('public."FileUpload_id_seq"'::regclass);


--
-- Name: Ticket id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Ticket" ALTER COLUMN id SET DEFAULT nextval('public."Ticket_id_seq"'::regclass);


--
-- Name: User id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- Data for Name: Category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Category" (id, category) FROM stdin;
1	Pendaftaran
2	Pembayaran
3	Diklat
4	Lainnya
\.


--
-- Data for Name: FileUpload; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."FileUpload" (id, filename, filepath, "createdAt", "isActive") FROM stdin;
3	1775960470210_7099-Article_Text-16400-1-10-20250714.pdf	uploads/1775960470210_7099-Article_Text-16400-1-10-20250714.pdf	2026-04-12 02:21:10.223	f
6	1776307930955_Hiring.pdf	uploads/1776307930955_Hiring.pdf	2026-04-16 02:52:10.984	t
\.


--
-- Data for Name: Ticket; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Ticket" (id, name, email, message, status, "createAt", "categoryId", "assignedToId", "answeredAt", "answeredById", response) FROM stdin;
19	Unknown 	hidanjashin101@gmail.com	Saya ingin mengundurkan diri dari Diklat, apakah boleh?	Sudah Dijawab	2026-04-16 06:04:55.119	4	3	2026-04-17 06:35:15.475	3	waduh, jangan donk. emang kenapa wkwkwk?
21	Rahmat Balon	sawsa@gmail.com	mengajukan pertanyaan hshshs	Diproses	2026-04-21 02:08:44.316	1	3	\N	\N	\N
20	Kim Hongjoong	satuduatiga@apasaja.com	kndalksndlkanlad	Diproses	2026-04-17 06:18:34.625	1	3	\N	\N	\N
17	pacarHongjoong	hidanjashin101@gmail.com	hari ini kamu melakukan apa?	Sudah Dijawab	2026-04-16 02:37:19.61	1	3	2026-04-16 02:38:21.377	3	sedang melakukan coding untuk sistem ticketing
18	Ari Bakso	hidanjashin101@gmail.com	saya ingin konsultasi terkait kelengkapan data diri	Sudah Dijawab	2026-04-16 05:52:56.574	2	5	2026-04-16 05:55:34.579	5	kamu bisa cek gmail kita disini ya...
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, username, name, role, password) FROM stdin;
1	Master_Admin	Master Admin	MASTER	$2b$10$1.5TA2k.Gq1Id6qx46tBheLHyrIpJnnNO/BRy8Nl1LVeruLWTIB2G
2	Ketua_Alami	Ketua Alami	MASTER	$2b$10$90NphlHbV7e7wZ4fNlV24.EXXRJ3s5rZkJAJ48fIBk4DctKuXuV5u
3	admin_pendaftaran	Admin Pendaftaran	ADMIN_BISPRO	$2b$10$kkjqbkohaax0lWsmtSrwoeerAWNf1NQjS9ToPLAweNRhToKk8WkOK
4	admin_diklat	Admin Diklat	ADMIN_BISPRO	$2b$10$BH5MxRX4W/OHyjcDGoNZNeZyGjgZ8vDZfimjDJ.HK3toUOyfG4tLW
5	admin_pembayaran	Admin Pembayaran	ADMIN_BISPRO	$2b$10$sOKywZxN3Jj5kpQeBOQJeeOsRyxHsnvM8coH4eZRXLeafgr58guDG
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
1ff974a1-c01f-4609-bfc9-7b0d1f0cb380	f15ce7281e9c4e0b9adf741d7155fa4c8813b4d309d0e5cc32f20ee27786fd31	2026-04-11 22:48:27.70855+07	20260410042821_init	\N	\N	2026-04-11 22:48:27.639133+07	1
4c1bf227-9236-4273-ba78-7bf00f3845a3	dac0e51e2c4d614197a7b5d72da50950dbb83069c9ad5860b811ea55ae9a53a5	2026-04-11 22:48:27.714649+07	20260411084322_add_assign_ticket	\N	\N	2026-04-11 22:48:27.709318+07	1
e6f76466-d5be-4f90-8cfc-5ecbafea9449	3da51c74c040d35797a78483fe998cd3a4eb830fa44e75df952a8507748e7747	2026-04-13 13:42:28.659006+07	20260413064228_add_response_ticket	\N	\N	2026-04-13 13:42:28.643253+07	1
\.


--
-- Name: Category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Category_id_seq"', 4, true);


--
-- Name: FileUpload_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."FileUpload_id_seq"', 6, true);


--
-- Name: Ticket_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Ticket_id_seq"', 21, true);


--
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."User_id_seq"', 5, true);


--
-- Name: Category Category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Category"
    ADD CONSTRAINT "Category_pkey" PRIMARY KEY (id);


--
-- Name: FileUpload FileUpload_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."FileUpload"
    ADD CONSTRAINT "FileUpload_pkey" PRIMARY KEY (id);


--
-- Name: Ticket Ticket_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Ticket"
    ADD CONSTRAINT "Ticket_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Category_category_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Category_category_key" ON public."Category" USING btree (category);


--
-- Name: User_username_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_username_key" ON public."User" USING btree (username);


--
-- Name: Ticket Ticket_assignedToId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Ticket"
    ADD CONSTRAINT "Ticket_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Ticket Ticket_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Ticket"
    ADD CONSTRAINT "Ticket_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public."Category"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

