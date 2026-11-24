CREATE TABLE "aliases" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"alias" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "aliases_alias_unique" UNIQUE("alias")
);
--> statement-breakpoint
CREATE TABLE "badges" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"icon_prefix" text DEFAULT 'solid' NOT NULL,
	"icon_name" text NOT NULL,
	"icon_url" text,
	"color" text DEFAULT 'pink' NOT NULL,
	CONSTRAINT "badges_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "links" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"title" text NOT NULL,
	"url" text NOT NULL,
	"clicks" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "page_views" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"ip" text,
	"device" text,
	"country" text,
	"city" text,
	"latitude" text,
	"longitude" text,
	"referrer" text,
	"user_agent" text
);
--> statement-breakpoint
CREATE TABLE "premium_subscriptions" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"plan" text DEFAULT 'plus' NOT NULL,
	"status" text DEFAULT 'active' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"expires_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "profile_feedback" (
	"id" text PRIMARY KEY NOT NULL,
	"profile_user_id" integer NOT NULL,
	"voter_ip" text NOT NULL,
	"kind" text DEFAULT 'like' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "profile_feedback_profile_voter_idx" UNIQUE("profile_user_id","voter_ip")
);
--> statement-breakpoint
CREATE TABLE "profile_widgets" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"type" text NOT NULL,
	"enabled" integer DEFAULT 0 NOT NULL,
	"position" integer DEFAULT 0 NOT NULL,
	"config" text,
	CONSTRAINT "profile_widgets_user_type_idx" UNIQUE("user_id","type")
);
--> statement-breakpoint
CREATE TABLE "profiles" (
	"user_id" integer PRIMARY KEY NOT NULL,
	"avatar_url" text,
	"background_url" text,
	"banner_url" text,
	"cursor_url" text,
	"layout" text DEFAULT 'centered' NOT NULL,
	"blur" integer DEFAULT 0 NOT NULL,
	"card_blur" integer DEFAULT 20 NOT NULL,
	"overlay_enabled" integer DEFAULT 0 NOT NULL,
	"overlay_text" text DEFAULT 'Click to show' NOT NULL,
	"tilt_enabled" integer DEFAULT 0 NOT NULL,
	"tilt_mode" text DEFAULT 'tilt' NOT NULL,
	"border_radius" integer DEFAULT 24 NOT NULL,
	"border_width" integer DEFAULT 1 NOT NULL,
	"description" text,
	"display_name" text,
	"card_opacity" integer DEFAULT 100 NOT NULL,
	"border_opacity" integer DEFAULT 100 NOT NULL,
	"card_width" integer DEFAULT 420 NOT NULL,
	"card_blur_enabled" integer DEFAULT 1 NOT NULL,
	"avatar_shape" text DEFAULT 'circle' NOT NULL,
	"location" text,
	"occupation" text,
	"bio" text,
	"show_views" integer DEFAULT 1 NOT NULL,
	"views_position" text DEFAULT 'top-right' NOT NULL,
	"badges_position" text DEFAULT 'auto' NOT NULL,
	"custom_layout" text,
	"accent_color" text DEFAULT 'white' NOT NULL,
	"primary_color" text DEFAULT 'white' NOT NULL,
	"text_color" text DEFAULT 'white' NOT NULL,
	"border_color" text DEFAULT 'white' NOT NULL,
	"background_color" text DEFAULT '#111111' NOT NULL,
	"badge_color" text DEFAULT 'white' NOT NULL,
	"social_color" text DEFAULT 'white' NOT NULL,
	"link_hover_color" text DEFAULT 'white' NOT NULL,
	"glow_enabled" integer DEFAULT 1 NOT NULL,
	"username_glow" integer DEFAULT 1 NOT NULL,
	"gradient_enabled" integer DEFAULT 0 NOT NULL,
	"gradient_primary" text DEFAULT '#881c9c' NOT NULL,
	"gradient_secondary" text DEFAULT '#0d0d0d' NOT NULL,
	"show_feedback" integer DEFAULT 1 NOT NULL,
	"username_color" text,
	"avatar_hidden" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "social_links" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"platform" text NOT NULL,
	"url" text NOT NULL,
	"icon_url" text,
	"order" integer DEFAULT 0 NOT NULL,
	"clicks" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "social_links_user_platform_idx" UNIQUE("user_id","platform")
);
--> statement-breakpoint
CREATE TABLE "template_favorites" (
	"id" text PRIMARY KEY NOT NULL,
	"template_id" text NOT NULL,
	"user_id" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "template_favorites_template_user_idx" UNIQUE("template_id","user_id")
);
--> statement-breakpoint
CREATE TABLE "template_uses" (
	"id" text PRIMARY KEY NOT NULL,
	"template_id" text NOT NULL,
	"user_id" integer NOT NULL,
	"used_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "templates" (
	"id" text PRIMARY KEY NOT NULL,
	"owner_id" integer,
	"name" text NOT NULL,
	"description" text,
	"preview_url" text,
	"tags" text DEFAULT '' NOT NULL,
	"visibility" text DEFAULT 'public' NOT NULL,
	"premium_only" integer DEFAULT 0 NOT NULL,
	"snapshot" text NOT NULL,
	"use_count" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_badges" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"badge_id" text NOT NULL,
	"hidden" integer DEFAULT 0 NOT NULL,
	"color" text,
	"position" integer DEFAULT 0 NOT NULL,
	"glow" integer DEFAULT 1 NOT NULL,
	CONSTRAINT "user_badges_user_badge_idx" UNIQUE("user_id","badge_id")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"email" text NOT NULL,
	"password_hash" text NOT NULL,
	"is_admin" integer DEFAULT 0 NOT NULL,
	"premium" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "aliases" ADD CONSTRAINT "aliases_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "links" ADD CONSTRAINT "links_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "page_views" ADD CONSTRAINT "page_views_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "premium_subscriptions" ADD CONSTRAINT "premium_subscriptions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profile_feedback" ADD CONSTRAINT "profile_feedback_profile_user_id_users_id_fk" FOREIGN KEY ("profile_user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profile_widgets" ADD CONSTRAINT "profile_widgets_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "social_links" ADD CONSTRAINT "social_links_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "template_favorites" ADD CONSTRAINT "template_favorites_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "template_uses" ADD CONSTRAINT "template_uses_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_badges" ADD CONSTRAINT "user_badges_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_badges" ADD CONSTRAINT "user_badges_badge_id_badges_id_fk" FOREIGN KEY ("badge_id") REFERENCES "public"."badges"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "aliases_user_id_idx" ON "aliases" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "page_views_user_id_idx" ON "page_views" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "premium_subscriptions_user_id_idx" ON "premium_subscriptions" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "profile_feedback_profile_kind_idx" ON "profile_feedback" USING btree ("profile_user_id","kind");--> statement-breakpoint
CREATE INDEX "profile_widgets_user_id_idx" ON "profile_widgets" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "template_favorites_template_id_idx" ON "template_favorites" USING btree ("template_id");--> statement-breakpoint
CREATE INDEX "template_uses_template_id_idx" ON "template_uses" USING btree ("template_id");--> statement-breakpoint
CREATE INDEX "template_uses_user_id_idx" ON "template_uses" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "templates_owner_id_idx" ON "templates" USING btree ("owner_id");