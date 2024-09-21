export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      accounts: {
        Row: {
          balance: number;
          created_at: string;
          id: string;
          name: string;
          type: string | null;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          balance?: number;
          created_at?: string;
          id?: string;
          name: string;
          type?: string | null;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          balance?: number;
          created_at?: string;
          id?: string;
          name?: string;
          type?: string | null;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "accounts_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      envelope_recurrence_patterns: {
        Row: {
          created_at: string;
          custom_date: string | null;
          day_of_month: number | null;
          day_of_week: number | null;
          end_date: string | null;
          envelope_id: string | null;
          id: string;
          interval_value: number;
          month_of_year: number | null;
          recurrence_type: string | null;
          start_date: string;
          updated_at: string;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          custom_date?: string | null;
          day_of_month?: number | null;
          day_of_week?: number | null;
          end_date?: string | null;
          envelope_id?: string | null;
          id?: string;
          interval_value?: number;
          month_of_year?: number | null;
          recurrence_type?: string | null;
          start_date?: string;
          updated_at?: string;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          custom_date?: string | null;
          day_of_month?: number | null;
          day_of_week?: number | null;
          end_date?: string | null;
          envelope_id?: string | null;
          id?: string;
          interval_value?: number;
          month_of_year?: number | null;
          recurrence_type?: string | null;
          start_date?: string;
          updated_at?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "envelope_recurrence_patterns_envelope_id_fkey";
            columns: ["envelope_id"];
            isOneToOne: false;
            referencedRelation: "envelopes";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "envelope_recurrence_patterns_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      envelopes: {
        Row: {
          assigned: number;
          created_at: string;
          description: string | null;
          due: string | null;
          id: string;
          is_recurring: boolean;
          name: string;
          parent_envelope_id: string | null;
          spent: number;
          target: number;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          assigned?: number;
          created_at?: string;
          description?: string | null;
          due?: string | null;
          id?: string;
          is_recurring?: boolean;
          name: string;
          parent_envelope_id?: string | null;
          spent?: number;
          target?: number;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          assigned?: number;
          created_at?: string;
          description?: string | null;
          due?: string | null;
          id?: string;
          is_recurring?: boolean;
          name?: string;
          parent_envelope_id?: string | null;
          spent?: number;
          target?: number;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "envelopes_parent_envelope_id_fkey";
            columns: ["parent_envelope_id"];
            isOneToOne: false;
            referencedRelation: "envelopes";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "envelopes_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      transactions: {
        Row: {
          amount: number | null;
          created_at: string;
          date: string;
          description: string | null;
          envelope_id: string | null;
          from_account: string | null;
          id: string;
          to_account: string | null;
          type: string;
          updated_at: string;
          user_id: string | null;
        };
        Insert: {
          amount?: number | null;
          created_at?: string;
          date?: string;
          description?: string | null;
          envelope_id?: string | null;
          from_account?: string | null;
          id?: string;
          to_account?: string | null;
          type: string;
          updated_at?: string;
          user_id?: string | null;
        };
        Update: {
          amount?: number | null;
          created_at?: string;
          date?: string;
          description?: string | null;
          envelope_id?: string | null;
          from_account?: string | null;
          id?: string;
          to_account?: string | null;
          type?: string;
          updated_at?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "transactions_envelope_id_fkey";
            columns: ["envelope_id"];
            isOneToOne: false;
            referencedRelation: "envelopes";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "transactions_from_account_fkey";
            columns: ["from_account"];
            isOneToOne: false;
            referencedRelation: "accounts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "transactions_to_account_fkey";
            columns: ["to_account"];
            isOneToOne: false;
            referencedRelation: "accounts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "transactions_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      users: {
        Row: {
          avatar_url: string | null;
          created_at: string | null;
          email: string;
          full_name: string | null;
          id: string;
          updated_at: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          created_at?: string | null;
          email: string;
          full_name?: string | null;
          id: string;
          updated_at?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          created_at?: string | null;
          email?: string;
          full_name?: string | null;
          id?: string;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "fk_auth_user";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;
