// Tenant Management TypeScript Interfaces
// Based on FRONTEND_TENANT_MANAGEMENT.md specification

export interface Tenant {
  id: string; // UUID
  name: string;
  short_name?: string;
  domain?: string;
  subdomain_preference?: string;
  subdomain_activated_at?: string;
  status: 'active' | 'inactive' | 'pending_verification' | 'suspended';
  type: 'organization' | 'personal';
  plan_id?: string;
  trial_ends_at?: string;
  organization_id?: string;
  data?: Record<string, any>;
  created_at: string;
  updated_at: string;

  // Relations
  plan?: {
    id: string;
    name: string;
    price: number;
  };
  organization?: {
    id: string;
    name: string;
  };
}

export interface TenantDetail extends Tenant {
  users_count?: number;
  agents_count?: number;
  subscriptions?: Subscription[];
  current_subscription?: Subscription;
}

export interface Subscription {
  id: string;
  tenant_id: string;
  plan_id: string;
  status: 'active' | 'cancelled' | 'expired' | 'trial';
  billing_cycle: 'monthly' | 'yearly';
  starts_at: string;
  ends_at?: string;
  trial_ends_at?: string;
  cancelled_at?: string;
  created_at: string;
  updated_at: string;

  plan?: {
    id: string;
    name: string;
    price: number;
  };
}

export interface TenantStatistics {
  total_tenants: number;
  active_tenants: number;
  inactive_tenants: number;
  suspended_tenants: number;
  trial_tenants: number;
  paid_tenants: number;
  revenue_this_month: number;
  new_tenants_this_month: number;
  churn_rate: number;
  by_plan: {
    plan_name: string;
    count: number;
  }[];
}

export interface TenantListParams {
  page?: number;
  per_page?: number;
  search?: string;
  status?: 'active' | 'inactive' | 'pending_verification' | 'suspended';
  plan_id?: string;
  type?: 'organization' | 'personal';
  sort_by?: 'name' | 'created_at' | 'subdomain';
  sort_order?: 'asc' | 'desc';
}

export interface TenantListResponse {
  success: boolean;
  data: {
    data: Tenant[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export interface TenantDetailResponse {
  success: boolean;
  data: TenantDetail;
}

export interface TenantStatisticsResponse {
  success: boolean;
  data: TenantStatistics;
}

export interface CreateTenantRequest {
  name: string;
  short_name?: string;
  subdomain_preference: string;
  type: 'organization' | 'personal';
  status?: 'active' | 'pending_verification';
  plan_id?: string;
  trial_ends_at?: string;
  organization_id?: string;
  data?: {
    owner_email?: string;
    owner_name?: string;
    phone?: string;
    industry?: string;
    company_size?: string;
    [key: string]: any;
  };
}

export interface UpdateTenantRequest {
  name?: string;
  short_name?: string;
  domain?: string;
  subdomain_preference?: string;
  data?: Record<string, any>;
}

export interface UpdateTenantStatusRequest {
  status: 'active' | 'inactive' | 'suspended';
  reason?: string;
}

export interface ChangeSubscriptionRequest {
  plan_id: string;
  billing_cycle: 'monthly' | 'yearly';
  starts_immediately?: boolean;
  reason?: string;
}

export interface ExtendTrialRequest {
  days: number;
  reason?: string;
}

export interface DeleteTenantRequest {
  hard_delete?: boolean;
  reason?: string;
}

export interface TenantFilters {
  search: string;
  status: string | null;
  plan_id: string | null;
  type: string | null;
}

export interface Pagination {
  page: number;
  per_page: number;
  total: number;
  last_page?: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}
