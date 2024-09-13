import React, { useState } from 'react'
import SidebarStability from '../../components/SidebarStability';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Modal } from '../../components/ui/modal';
import { PlusIcon, ArrowLeftIcon } from "@radix-ui/react-icons";
import { TextField } from "../../components";
import { Form, Formik } from "formik";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { LuBuilding } from "react-icons/lu";
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { StabilityContent } from '../../components/stability/StabilityContent'
export const StabilityPage = () => {
  return (
    <div className="flex">
        <SidebarStability />
        <main className="flex flex-col  text-black flex-grow m-0 mt-14 w-full lg:ml-64">
          <div className="p-5">
            <StabilityContent />
          </div>
        </main>
    </div>
  )
}

