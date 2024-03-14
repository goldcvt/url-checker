import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUrlsTable1710457904239 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        --
        -- Name: urls; Type: TABLE; Schema: public; Owner: postgres
        --

        CREATE TABLE public.urls (
            id bigint NOT NULL,
            url text NOT NULL,
            last_checked_at timestamp with time zone,
            last_check_status smallint,
            last_resolved_ip text NOT NULL,
            CONSTRAINT "CHK_85b9484fe7aba6165b7629b02b" CHECK (((last_check_status > 100) AND (last_check_status < 600)))
        );


        ALTER TABLE public.urls OWNER TO postgres;

        --
        -- Name: COLUMN urls.url; Type: COMMENT; Schema: public; Owner: postgres
        --

        COMMENT ON COLUMN public.urls.url IS 'Original URL, will not be updated';


        --
        -- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
        --

        CREATE SEQUENCE public.urls_id_seq
            START WITH 1
            INCREMENT BY 1
            NO MINVALUE
            NO MAXVALUE
            CACHE 1;


        ALTER TABLE public.urls_id_seq OWNER TO postgres;

        --
        -- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
        --

        ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;


        --
        -- Name: urls id; Type: DEFAULT; Schema: public; Owner: postgres
        --

        ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


        --
        -- Name: urls UQ_ec198edcc54cc05ca0aad8d9b3c; Type: CONSTRAINT; Schema: public; Owner: postgres
        --

        ALTER TABLE ONLY public.urls
            ADD CONSTRAINT "UQ_ec198edcc54cc05ca0aad8d9b3c" UNIQUE (url);


        --
        -- Name: urls url_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
        --

        ALTER TABLE ONLY public.urls
            ADD CONSTRAINT url_pkey PRIMARY KEY (id);

    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE IF EXISTS public.urls CASCADE;
    `);
  }
}
