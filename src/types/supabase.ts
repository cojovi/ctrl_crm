export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      customers: {
        Row: {
          id: string
          created_at: string
          email: string
          name: string
          phone: string
          address: string
          city: string
          state: string
          zip: string
          notes: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          email: string
          name: string
          phone: string
          address: string
          city: string
          state: string
          zip: string
          notes?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          email?: string
          name?: string
          phone?: string
          address?: string
          city?: string
          state?: string
          zip?: string
          notes?: string | null
        }
      }
      leads: {
        Row: {
          id: string
          created_at: string
          customer_id: string
          status: string
          source: string
          service_type: string
          door_type: string | null
          door_size: string | null
          notes: string | null
          expected_value: number | null
          assigned_to: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          customer_id: string
          status: string
          source: string
          service_type: string
          door_type?: string | null
          door_size?: string | null
          notes?: string | null
          expected_value?: number | null
          assigned_to?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          customer_id?: string
          status?: string
          source?: string
          service_type?: string
          door_type?: string | null
          door_size?: string | null
          notes?: string | null
          expected_value?: number | null
          assigned_to?: string | null
        }
      }
      quotes: {
        Row: {
          id: string
          created_at: string
          lead_id: string
          amount: number
          status: string
          valid_until: string
          items: Json[]
          notes: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          lead_id: string
          amount: number
          status: string
          valid_until: string
          items: Json[]
          notes?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          lead_id?: string
          amount?: number
          status?: string
          valid_until?: string
          items?: Json[]
          notes?: string | null
        }
      }
      appointments: {
        Row: {
          id: string
          created_at: string
          customer_id: string
          lead_id: string | null
          technician_id: string
          start_time: string
          end_time: string
          status: string
          service_type: string
          notes: string | null
          location: string
        }
        Insert: {
          id?: string
          created_at?: string
          customer_id: string
          lead_id?: string | null
          technician_id: string
          start_time: string
          end_time: string
          status: string
          service_type: string
          notes?: string | null
          location: string
        }
        Update: {
          id?: string
          created_at?: string
          customer_id?: string
          lead_id?: string | null
          technician_id?: string
          start_time?: string
          end_time?: string
          status?: string
          service_type?: string
          notes?: string | null
          location?: string
        }
      }
      technicians: {
        Row: {
          id: string
          user_id: string
          name: string
          email: string
          phone: string
          skills: string[]
          status: string
          current_location: Json | null
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          email: string
          phone: string
          skills: string[]
          status: string
          current_location?: Json | null
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          email?: string
          phone?: string
          skills?: string[]
          status?: string
          current_location?: Json | null
        }
      }
      inventory_items: {
        Row: {
          id: string
          created_at: string
          name: string
          sku: string
          category: string
          quantity: number
          unit_price: number
          location: string
          reorder_point: number
          supplier_id: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          sku: string
          category: string
          quantity: number
          unit_price: number
          location: string
          reorder_point: number
          supplier_id?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          sku?: string
          category?: string
          quantity?: number
          unit_price?: number
          location?: string
          reorder_point?: number
          supplier_id?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}