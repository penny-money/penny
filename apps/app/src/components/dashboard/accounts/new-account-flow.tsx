"use client";

import { Button } from "@penny/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@penny/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@penny/ui/dialog";
import { Badge } from "@penny/ui/badge";
import { NewAccountForm } from "./new-account-form";
import { useState } from "react";

interface NewAccountFlowProps {
  firstAccount?: true;
}

export const NewAccountFlow: React.FC<NewAccountFlowProps> = ({
  firstAccount,
}) => {
  const [openMainDialog, setOpenMainDialog] = useState(false);
  const [openManualDialog, setOpenManualDialog] = useState(false);

  return (
    <div className="text-center space-y-4 max-w-sm">
      {firstAccount && (
        <div className="space-y-2">
          <h1 className="text-2xl">Create your first account</h1>
          <p className="text-sm text-secondary-foreground">
            Create an account to unlock powerful insights. Track your spending
            and make informed decisions
          </p>
        </div>
      )}
      <Dialog open={openMainDialog} onOpenChange={setOpenMainDialog}>
        <DialogTrigger asChild>
          <Button>{firstAccount ? "Create" : "Add"} account</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a new account</DialogTitle>
            <DialogDescription>
              Set up a new account using any of the available methods and start
              tracking your transactions
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <Dialog open={openManualDialog} onOpenChange={setOpenManualDialog}>
              <DialogTrigger asChild>
                <Card className="relative cursor-pointer">
                  <CardHeader>
                    <CardTitle>Manual creation</CardTitle>
                    <CardDescription>
                      Manually fill in your account details.
                    </CardDescription>
                  </CardHeader>
                  <Badge className="absolute top-0 right-0">New</Badge>
                </Card>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Set up your bank account</DialogTitle>
                </DialogHeader>
                <NewAccountForm
                  closeDialog={() => {
                    setOpenMainDialog(false);
                    setOpenManualDialog(false);
                  }}
                />
              </DialogContent>
            </Dialog>

            <Card className="relative bg-muted text-muted-foreground cursor-not-allowed">
              <CardHeader>
                <CardTitle>Sync bank account</CardTitle>
                <CardDescription>
                  Conviniently connect to your bank and syncronize your
                  transactions
                </CardDescription>
              </CardHeader>
              <Badge
                variant="secondary"
                className="absolute top-0 right-0 bg-accent"
              >
                Soon
              </Badge>
            </Card>

            <Card className="relative bg-muted text-muted-foreground cursor-not-allowed">
              <CardHeader>
                <CardTitle>Import</CardTitle>
                <CardDescription>
                  Upload your transaction data as a screenshot, csv, or excel
                </CardDescription>
              </CardHeader>
              <Badge
                variant="secondary"
                className="absolute top-0 right-0 bg-accent"
              >
                Soon
              </Badge>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
