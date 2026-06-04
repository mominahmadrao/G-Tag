import React, { useState, useEffect } from "react";
import axios from "@/api/axios";
import { useAuth } from "@/context/AuthContext/Authcontext";
import { useCart } from "@/context/CartContext/CartContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ShieldCheck,
  Sparkles,
  Zap,
  Calendar,
  Ban,
  CheckCircle2,
} from "lucide-react";

export function SubscriptionPage() {
  const { user, refreshUser } = useAuth();
  const { refreshCart } = useCart();

  const [activeSub, setActiveSub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  // 1. Matched directly to your live database snapshots
  const plansBlueprints = [
    {
      mongoId: "69fd983672a8bf2693c435e9", // Raw Gamer ID from your DB
      id: "gamer",
      name: "Gamer Elite",
      price: "Rs. 1,500",
      discount: "10%",
      description:
        "Tailored directly for competitive players looking for a marketplace edge.",
      features: ["Ads Free", "10% Discount on Cart"],
      icon: <Sparkles className="h-6 w-6 text-cyan-400" />,
    },
    {
      mongoId: "69fd97b9b5b36826197708d2", // Raw Premium ID from your DB
      id: "premium",
      name: "Premium VIP",
      price: "Rs. 3,500",
      discount: "15%",
      description: "The absolute maximum G-TAG platform experience.",
      features: ["Ads Free", "Early Access", "15% Discount on Cart"],
      icon: <ShieldCheck className="h-6 w-6 text-emerald-400" />,
    },
  ];

  const fetchActiveSubscription = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/subscriptions/me");
      if (res.data?.success) {
        setActiveSub(res.data.data);
      }
    } catch (err) {
      console.error("Error pooling active subscription matrices:", err);
      setActiveSub(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActiveSubscription();
  }, [user]);

  // 2. Modified to send the hex ObjectId matching 'planId' constraints
  const handleSubscribe = async (planObjectId, planName) => {
    try {
      setActionLoading(true);

      // Sending planId cleanly matching your input validator constraints
      const res = await axios.post("/subscriptions/subscribe", {
        planId: planObjectId,
      });

      if (res.data?.success) {
        alert(
          `Successfully provisioned account assignment to the ${planName.toUpperCase()} tier!`,
        );
        window.location.reload(); // Hard refresh to force backend token cookie re-evaluation
      }
    } catch (err) {
      console.error("Upgrade Pipeline Crash Dump:", err.response?.data);
      alert(
        err.response?.data?.message ||
          "Subscription upgrade routing conflict. Check backend date validation logic.",
      );
    } finally {
      setActionLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    if (
      !confirm(
        "Are you sure you want to alter your tier renewal constraints? Benefits remain active until current billing deadlines elapse.",
      )
    )
      return;
    try {
      setActionLoading(true);
      const res = await axios.delete("/subscriptions/cancel");
      if (res.data?.success) {
        alert("Auto-renewal canceled successfully.");
        await fetchActiveSubscription();
      }
    } catch (err) {
      alert(err.response?.data?.message || "Cancellation request failed.");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12 font-mono text-slate-400">
        Syncing SaaS Core Lifecycle Matrices...
      </div>
    );
  }

  // Determine active dynamic display properties
  // Checking user.subscription.plan properties to highlight current bounds
  const activePlanIdFromContext =
    activeSub?.plan?._id || user?.subscription?.plan;

  return (
    <div className="max-w-5xl mx-auto my-8 p-4 text-slate-100 space-y-12">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-lime-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
          G-TAG SaaS Portal
        </h1>
        <p className="text-slate-400 text-sm max-w-md mx-auto">
          Manage system configurations, allocate privilege tokens, and optimize
          transaction overhead metrics.
        </p>
      </div>

      {/* SECTION 1: Active Member Management Console View */}
      {activeSub && activeSub.status === "active" && (
        <Card className="bg-slate-950 border-slate-800 text-white max-w-2xl mx-auto shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl" />
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold tracking-tight">
                  Active Plan Node Allocated
                </CardTitle>
                <CardDescription className="text-slate-400">
                  SaaS deployment logs tracking active privileges.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-slate-900/50 border border-slate-900">
              <div>
                <span className="text-xs text-slate-500 block uppercase font-mono">
                  Current Cluster Tier
                </span>
                <span className="text-lg font-bold text-white capitalize">
                  {activeSub.plan?.name || "Member Node"}
                </span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block uppercase font-mono">
                  Ledger Node Status
                </span>
                <span className="text-lg font-bold text-emerald-400 flex items-center gap-1.5 capitalize">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                  {activeSub.status}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 p-2 px-3 bg-slate-900 rounded-lg">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-cyan-400" />
                <span>
                  Days remaining until next billing calculations cycle:
                </span>
              </div>
              <strong className="text-white text-sm font-mono">
                {activeSub.remainingDays ?? "30"} Days
              </strong>
            </div>
          </CardContent>
          <CardFooter className="border-t border-slate-900 bg-slate-900/10 p-4 flex justify-end">
            <Button
              onClick={handleCancelSubscription}
              disabled={actionLoading}
              variant="destructive"
              className="gap-2 h-9 text-xs font-semibold"
            >
              <Ban className="h-4 w-4" /> Cancel Auto-Renewal Structure
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* SECTION 2: Pricing Matrix */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-white text-center">
          Available Privilege Blueprints
        </h2>
        <Separator className="bg-slate-800 max-w-xs mx-auto" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 max-w-3xl mx-auto">
          {plansBlueprints.map((blueprint) => {
            const isCurrentTier = activePlanIdFromContext === blueprint.mongoId;

            return (
              <Card
                key={blueprint.id}
                className={`bg-slate-950 border-slate-800 text-white flex flex-col justify-between transition-all duration-300 ${
                  isCurrentTier
                    ? "ring-2 ring-emerald-500 shadow-[0_0_24px_rgba(16,185,129,0.15)] border-transparent"
                    : "hover:border-slate-700"
                }`}
              >
                <CardHeader className="relative">
                  {isCurrentTier && (
                    <span className="absolute top-4 right-4 bg-emerald-500 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      Current Active Node
                    </span>
                  )}
                  <div className="flex items-center gap-3 mb-2">
                    {blueprint.icon}
                    <CardTitle className="text-lg font-bold capitalize">
                      {blueprint.id}
                    </CardTitle>
                  </div>
                  <CardDescription className="text-slate-400 text-xs min-h-[32px]">
                    {blueprint.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4 flex-1">
                  <div className="py-2">
                    <span className="text-3xl font-black text-white tracking-tight">
                      {blueprint.price}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">
                      {" "}
                      / 30 Days
                    </span>
                    <span className="block text-xs text-emerald-400 font-medium mt-2">
                      🚀 Unlocks flat {blueprint.discount} basket price slashes
                      across your checkout drawers.
                    </span>
                  </div>

                  <Separator className="bg-slate-900" />

                  <ul className="space-y-2 text-xs text-slate-400">
                    {blueprint.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 leading-relaxed"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="pt-4 border-t border-slate-900/50">
                  <Button
                    onClick={() =>
                      handleSubscribe(blueprint.mongoId, blueprint.id)
                    }
                    disabled={actionLoading || isCurrentTier}
                    className={`w-full font-bold text-xs tracking-wider uppercase h-10 ${
                      isCurrentTier
                        ? "bg-slate-900 text-slate-500 border border-slate-800 cursor-not-allowed"
                        : "bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 hover:brightness-110"
                    }`}
                  >
                    {isCurrentTier
                      ? "Node Fully Bound"
                      : `Deploy ${blueprint.id} Configuration`}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
