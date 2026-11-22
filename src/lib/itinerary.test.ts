import { describe, expect, it } from "vitest";
import { locations } from "@/data/locations";
import { formatDayTime, itineraryQuery, readItinerary, rentalDays } from "@/lib/itinerary";

describe("itinerary", () => {
  it("reads a valid trip from the URL", () => {
    const it_ = readItinerary(new URLSearchParams("loc=muc&from=2030-06-12T10:00&to=2030-06-15T10:00"), locations);
    expect(it_.location.code).toBe("MUC");
    expect(rentalDays(it_.from, it_.to)).toBe(3);
  });

  it("rounds partial days up", () => {
    expect(rentalDays("2030-06-12T10:00", "2030-06-15T10:30")).toBe(4);
    expect(rentalDays("2030-06-12T10:00", "2030-06-12T12:00")).toBe(1);
  });

  it("repairs a return that is before pick-up", () => {
    const it_ = readItinerary(new URLSearchParams("from=2030-06-12T10:00&to=2030-06-10T10:00"), locations);
    expect(new Date(it_.to) > new Date(it_.from)).toBe(true);
  });

  it("falls back to defaults for garbage input", () => {
    const it_ = readItinerary(new URLSearchParams("loc=xxx&from=tomorrow&to=<script>"), locations);
    expect(it_.location.id).toBe("zrh");
    expect(it_.from).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/);
  });

  it("formats like the Stitch search bar", () => {
    expect(formatDayTime("2030-10-14T09:30")).toBe("14 Oct, 09:30");
    expect(itineraryQuery({ location: "muc", from: "2030-06-12T10:00", to: "2030-06-15T10:00" })).toBe(
      "loc=muc&from=2030-06-12T10%3A00&to=2030-06-15T10%3A00",
    );
  });
});
