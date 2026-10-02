
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  
  "public": {
          Tables: {
            "admin_memberships": {
                  Row: {
                    "created_at": string,"deactivated_at": string | null,"granted_by": string | null,"is_active": boolean,"note": string | null,"updated_at": string,"user_id": string
                  }
                  Insert: {
                    "created_at"?: string,"deactivated_at"?: string | null,"granted_by"?: string | null,"is_active"?: boolean,"note"?: string | null,"updated_at"?: string,"user_id": string
                  }
                  Update: {
                    "created_at"?: string,"deactivated_at"?: string | null,"granted_by"?: string | null,"is_active"?: boolean,"note"?: string | null,"updated_at"?: string,"user_id"?: string
                  }
                  Relationships: [
                    
                  ]
                },"audit_log": {
                  Row: {
                    "action": string,"actor_user_id": string | null,"id": number,"metadata": NonNullable<Json>,"occurred_at": string,"target_id": string | null,"target_type": string | null
                  }
                  Insert: {
                    "action": string,"actor_user_id"?: string | null,"id"?: never,"metadata"?: NonNullable<Json>,"occurred_at"?: string,"target_id"?: string | null,"target_type"?: string | null
                  }
                  Update: {
                    "action"?: string,"actor_user_id"?: string | null,"id"?: never,"metadata"?: NonNullable<Json>,"occurred_at"?: string,"target_id"?: string | null,"target_type"?: string | null
                  }
                  Relationships: [
                    
                  ]
                },"content_drafts": {
                  Row: {
                    "body": NonNullable<Json>,"created_at": string,"document_id": string,"revision": number,"schema_version": number,"updated_at": string,"updated_by": string | null
                  }
                  Insert: {
                    "body": NonNullable<Json>,"created_at"?: string,"document_id": string,"revision"?: number,"schema_version": number,"updated_at"?: string,"updated_by"?: string | null
                  }
                  Update: {
                    "body"?: NonNullable<Json>,"created_at"?: string,"document_id"?: string,"revision"?: number,"schema_version"?: number,"updated_at"?: string,"updated_by"?: string | null
                  }
                  Relationships: [
                    
                  ]
                },"content_publication": {
                  Row: {
                    "published_at": string,"published_by": string | null,"release_number": number,"singleton": boolean
                  }
                  Insert: {
                    "published_at"?: string,"published_by"?: string | null,"release_number": number,"singleton"?: boolean
                  }
                  Update: {
                    "published_at"?: string,"published_by"?: string | null,"release_number"?: number,"singleton"?: boolean
                  }
                  Relationships: [
                    {
      foreignKeyName: "content_publication_release_number_fkey"
      columns: ["release_number"]
isOneToOne: false
      referencedRelation: "content_releases"
      referencedColumns: ["number"]
    }
                  ]
                },"content_releases": {
                  Row: {
                    "content": NonNullable<Json>,"created_at": string,"created_by": string | null,"created_by_email": string | null,"id": number,"kind": string,"note": string | null,"number": number,"restored_from": number | null,"schema_version": number
                  }
                  Insert: {
                    "content": NonNullable<Json>,"created_at"?: string,"created_by"?: string | null,"created_by_email"?: string | null,"id"?: never,"kind": string,"note"?: string | null,"number": number,"restored_from"?: number | null,"schema_version": number
                  }
                  Update: {
                    "content"?: NonNullable<Json>,"created_at"?: string,"created_by"?: string | null,"created_by_email"?: string | null,"id"?: never,"kind"?: string,"note"?: string | null,"number"?: number,"restored_from"?: number | null,"schema_version"?: number
                  }
                  Relationships: [
                    
                  ]
                }
          }
          Views: {
            [_ in never]: never
          }
          Functions: {
            "discard_content_draft":
{ Args: { "p_document_id": string,"p_expected_revision": number }; Returns: undefined
                           },
"publish_content":
{ Args: { "p_based_on": number,"p_content": Json,"p_documents": Json,"p_note"?: string,"p_schema_version": number }; Returns: number
                           },
"published_content":
{ Args: Record<PropertyKey, never>; Returns: {
              "content": Json,"number": number,"published_at": string,"schema_version": number
            }[]
                           },
"rollback_content":
{ Args: { "p_based_on": number,"p_note"?: string,"p_release": number }; Returns: number
                           },
"save_content_draft":
{ Args: { "p_body": Json,"p_document_id": string,"p_expected_revision": number,"p_schema_version": number }; Returns: {
              "revision": number,"updated_at": string
            }[]
                           }
          }
          Enums: {
            [_ in never]: never
          }
          CompositeTypes: {
            [_ in never]: never
          }
        }
}

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
  ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
  ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
  : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
  ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never

export const Constants = {
  "public": {
          Enums: {
            
          }
        }
} as const

