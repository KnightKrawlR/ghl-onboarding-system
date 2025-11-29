import { ENV } from "../_core/env";

export interface CreateLocationParams {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  website?: string;
  timezone?: string;
}

export interface GHLLocation {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  website?: string;
}

export class GHLService {
  private apiKey: string;
  private agencyId: string;
  private snapshotId: string;
  private baseUrl = "https://services.leadconnectorhq.com";

  constructor() {
    this.apiKey = ENV.ghlApiKey;
    this.agencyId = ENV.ghlAgencyId;
    this.snapshotId = ENV.ghlSnapshotId;
  }

  private async makeRequest(
    endpoint: string,
    method: string = "GET",
    body?: any
  ) {
    const url = `${this.baseUrl}${endpoint}`;
    const options: RequestInit = {
      method,
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        Version: "2021-07-28",
        "Content-Type": "application/json",
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);
    
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`GHL API Error (${response.status}): ${error}`);
    }

    return response.json();
  }

  async createLocation(params: CreateLocationParams): Promise<GHLLocation> {
    const body = {
      companyId: this.agencyId,
      name: params.name,
      email: params.email,
      phone: params.phone,
      address: params.address,
      city: params.city,
      state: params.state,
      postalCode: params.postalCode,
      country: params.country,
      website: params.website || "",
      timezone: params.timezone || "America/New_York",
    };

    const result = await this.makeRequest("/locations/", "POST", body);
    return result.location;
  }

  async applySnapshot(locationId: string): Promise<void> {
    await this.makeRequest(
      `/locations/${locationId}/snapshots/${this.snapshotId}/apply`,
      "POST"
    );
  }

  async createLocationWithSnapshot(
    params: CreateLocationParams
  ): Promise<GHLLocation> {
    // Create the location
    const location = await this.createLocation(params);

    // Apply the snapshot
    try {
      await this.applySnapshot(location.id);
    } catch (error) {
      console.error("Failed to apply snapshot:", error);
      // Don't throw - location was created successfully
    }

    return location;
  }
}

export const ghlService = new GHLService();
